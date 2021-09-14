const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const { isRef } = require('joi');

describe('Testes produtos na camada Model', () => {
  let connectionMock;

  const ID_EXAMPLE = "5f43a7ca92d58904914656b6";
  const payloadProduct = {
    name: "Produto do Batista",
    quantity: 100
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    
    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('model_example'));
    
    sinon.stub(mongoConnection, 'connection' ).resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('Cadastro de um produto', () => {
    
    describe('quando um produto é cadastrado com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await productsModel.addProduct(payloadProduct);
        
        expect(response).to.be.an('object');
      });
  
      it('o objeto deve deve possuir o "id" do novo produto cadastrado', async() => {
        const response = await productsModel.addProduct(payloadProduct);
  
        expect(response).to.have.a.property('_id');
      });
    });

  });

  describe('Busca um produto pelo nome', () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.findProductByName(payloadProduct.name);
      
      expect(response).to.be.an('object');
    });
  });
  
  describe('Busca todos os produtos da lista', () => {

    describe('quanto não existe nenhum produto criado', () => {
      
      it('retorna um array', async() => {
        const products = await productsModel.getAllProducts();
        
        expect(products).to.be.an('array');
      });

      // DÚVIDA, O ARRAY NÃO ESTÁ FICANDO VAZIO APÓS O TESTE ANTERIOR
      // it('o array é vazio', async() => {
      //   const products = await productsModel.getAllProducts();
      //   console.log(products);
      //   expect(products).to.be.empty;
      // });

    });

    describe('quando existem produtos na lista', () => {

      it('retorna um array', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.be.an('array');
      });

      it('o array está populado', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.be.not.empty;
      });
    })
  });

  describe('Busca um produto pelo id', () => {

    describe('quando o "id" informado é inválido', () => {
      const ID_WRONG = '123'
      it('a resposta é "null"', async() => {
        const response = await productsModel.findProductById(ID_WRONG);
        expect(response).to.be.null;
      });
    });

    describe('quando o produto não existe', () => {
      it('a resposta é "null"', async() => {
        const response = await productsModel.findProductById(ID_EXAMPLE);
        expect(response).to.be.null;
      })
    });

    describe('quando o produto existe', () => {
      it('retorna um objeto', async () => {
        const {_id } = await productsModel.addProduct(payloadProduct);
    
        const response = await productsModel.findProductById(_id);

        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const { _id } = await productsModel.addProduct(payloadProduct);

        const response = await productsModel.findProductById(_id);

        expect(response).include.all.keys(['_id', 'name', 'quantity']);
      });

      it('o produto encontrado possui o mesmo "id" buscado', async() => {
        const { _id } = await productsModel.addProduct(payloadProduct);
        const response = await productsModel.findProductById(_id);
        const { _id: idExpected } = response;
        expect(JSON.stringify(idExpected)).to.be.equal(JSON.stringify(_id));
      })
    });
  });

  describe('Atualiza um produto cadastrado', () => {
    
    describe('quando o "id" informado é inválido', () => {
      const ID_WRONG = '123'
      it('a resposta é "null"', async() => {
        const response = await productsModel.updateProduct(ID_WRONG);
        expect(response).to.be.null;
      });
    });

    describe('quando o produto é atualizado com sucesso', () => {
      
      const newPayloadProduct = {
        name: 'Produto do João',
        quantity: 5
      }

      it('retorna um objeto', async () => {
        const {_id } = await productsModel.addProduct(payloadProduct);
        const response = await productsModel.updateProduct(_id, newPayloadProduct.name, newPayloadProduct.quantity);
        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const { _id } = await productsModel.addProduct(payloadProduct);
        const response = await productsModel.updateProduct(_id, newPayloadProduct.name, newPayloadProduct.quantity);
        expect(response).include.all.keys(['_id', 'name', 'quantity']);
      });

      it('o produto possui um novo nome e uma nova quantidade', async () => {
        const { _id } = await productsModel.addProduct(payloadProduct);
        
        const productUpdated = await productsModel
          .updateProduct({id: _id, name: newPayloadProduct.name, quantity: newPayloadProduct.quantity});
        
        const { name, quantity} = productUpdated;
        
        expect(name).to.not.equal(payloadProduct.name);
        expect(quantity).to.not.equal(payloadProduct.quantity);
      });
    });
    
  });

  describe('Deleta um produto', () => {
    describe('quando o "id" informado é inválido', () => {
      const ID_WRONG = '123'
      it('a resposta é "null"', async() => {
        const response = await productsModel.removeProduct(ID_WRONG);
        expect(response).to.be.null;
      });
    });

    describe('quando o produto é deletado', () => {
      it('retorna um objeto', async() => {
        const {_id} = await productsModel.addProduct(payloadProduct);
        const response = await productsModel.removeProduct(_id);
        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const { _id } = await productsModel.addProduct(payloadProduct);
        const response = await productsModel.removeProduct(_id);
        
        expect(response).to.have.all.keys(['_id', 'name', 'quantity'])
      });

      it('o produto não está na lista', async () => {
        const { _id } = await productsModel.addProduct(payloadProduct);
        await productsModel.removeProduct(_id);
        
        const findProductRemoved = await connectionMock.collection('products').findOne({ _id });
        expect(findProductRemoved).to.be.null;
      });
    });
    
  });
});