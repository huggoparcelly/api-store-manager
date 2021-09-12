const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsServices');
const productsController = require('../../controllers/productsController');

describe('Testes produto na camada controller', () => {
  
  describe('Cadastro de um produto no controller', ()=> {

    // QUANDO REALIZA O CADASTRO NO CONTROLLER ESTÁ RETORNANDO UNDEFINED

    describe('quando um produto é cadastrado com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {
          name: "Produto do Batista",
          quantity: 100
        };
  
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
  
        sinon.stub(productsService, 'addProduct')
          .resolves(true);
      });
  
      after(() => {
        productsService.addProduct.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await productsController.addProduct(request, response);
        
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado um json com o produto adicionado', async () => {
        await productsController.addProduct(request, response);
        
        // DÚVIDA O QUE COLOCAR DENTRO DO CALLED {_id, name, quantity}
        expect(response.json.calledWith()).to.be.equal(true);
      });
  
    });
  
    // describe('quando não é possível cadastrar um produto', () => {
  
    //   describe('quando o payload informado é inválido', () => {
  
    //   })
    // })
  
  });
});