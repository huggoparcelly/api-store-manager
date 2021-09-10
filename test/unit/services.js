const { ObjectId } = require('mongodb');
const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsServices');

describe('Cadastro de um produto no service', () => {
  const ID_EXAMPLE = "5f43a7ca92d58904914656b6"
  
  describe('quando um produto é cadastrado com sucesso', () => {
    const payloadProduct = {
      name: "Produto do Batista",
      quantity: 100
    }
    
    before(() => {
      sinon.stub(productsModel, 'addProduct')
        .resolves({_id: ObjectId(ID_EXAMPLE)}, payloadProduct);
    })

    after(() => {
      productsModel.addProduct.restore();
    })
    
    it('retorna um objeto',  async() => {
      const response = await productsService.addProduct(payloadProduct);

      expect(response).to.be.an('object');
    })

    it('o objeto deve possuir o "id" do produto cadastrado', async() => {
      const response = await productsService.addProduct(payloadProduct);

      expect(response).to.have.a.property('_id');
    })
  });

  describe('quando não é possível cadastrar um produto', () => {
    
    describe('quando o payload informado é inválido', ()=>{
      const payloadProduct = {}
      it('retorna um boolean', async () => {
        const response = await productsService.addProduct(payloadProduct);
  
        expect(response).to.be.a('boolean');
      });
  
      it('o boolean contém "false"', async () => {
        const response = await productsService.addProduct(payloadProduct);
  
        expect(response).to.be.equal(false);
      });
    })

    // describe('quando já existe um produto cadastrado com o nome', ()=> {
    //   const payloadProduct = {
    //     name: "Produto do Batista",
    //     quantity: 100
    //   }

    //   const payloadProduct1 = {
    //     name: "Produto do Batista",
    //     quantity: 100
    //   }
      
    //   before(() => {
    //     sinon.stub(productsModel, 'addProduct')
    //       .resolves({_id: ObjectId(ID_EXAMPLE)}, payloadProduct);
    //   })
  
    //   after(() => {
    //     productsModel.addProduct.restore();
    //   })
      
    //   it('retorna um boolean', async () => {
    //     const response = await productsService.addProduct(payloadProduct1);
  
    //     expect(response).to.be.a('boolean');
    //   });
  
    //   it('o boolean contém "false"', async () => {
    //     const response = await productsService.addProduct(payloadProduct1);
  
    //     expect(response).to.be.equal(false);
    //   });
    // })
  });

});