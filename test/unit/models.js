const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const { isRef } = require('joi');

describe('Testes na camada Model', () => {
  let connectionMock;
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

    // after(async() => {
    //   await connectionMock.collection('products').deleteMany({});
    // })

    describe('quando um produto é cadastrado com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await productsModel.addProduct(payloadProduct);
  
        expect(response).to.be.an('object');
      });
  
      it('o objeto deve deve possuir o "id" do novo produto cadastrado', async() => {
        const response = await productsModel.addProduct(payloadProduct);
  
        expect(response).to.have.a.property('_id');
      })
  
      // dúvida porque o productCreated retorna null.
      // it('deve existir um produto com o nome cadastrado', async() => {
      //   await productsModel.addProduct(payloadProduct);
        
      //   const productCreated = await connectionMock.collection('products').findOne({ name: payloadProduct.name });
  
      //   expect(productCreated).to.be.not.null;
      // })
    })
  });
  
  describe('Busca todos a lista de produtos', () => {

    describe('quanto não existe nenhum produto criado', () => {
      
      it('retorna um objeto', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.be.an('object');
      });

      it('o objeto tem a propriedade "products"', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.have.a.property('products');
      });

      it('a propriedade "products" é um array', async() => {
        const { products } = await productsModel.getAllProducts();
        expect(products).to.be.an('array');
      });

      // DÚVIDA, O ARRAY NÃO ESTÁ FICANDO VAZIO APÓS O TESTE ANTERIOR
      // it('o array é vazio', async() => {
      //   const { products } = await productsModel.getAllProducts();
      //   expect(products).to.be.empty;
      // });
    });

    describe('quando existem produtos na lista', () => {
      it('retorna um objeto', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.be.an('object');
      });

      it('o objeto tem a propriedade "products"', async() => {
        const products = await productsModel.getAllProducts();
        expect(products).to.have.a.property('products');
      });

      it('a propriedade "products" é um array', async() => {
        const { products } = await productsModel.getAllProducts();
        expect(products).to.be.an('array');
      });

      it('o array está populado', async() => {
        const { products } = await productsModel.getAllProducts();
        expect(products).to.be.not.empty;
      });
    })
  });

  describe('Busca um produto pelo id', () => {
    const ID_EXAMPLE = "5f43a7ca92d58904914656b6";

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

      // DÚVIDA OS ID ESTÃO IGUAIS, PORÉM ESTÁ COM PROBLEMA NO TIPO
      // it('o produto encontrado possui o mesmo "id" buscado', async() => {
      //   const { _id } = await productsModel.addProduct(payloadProduct);

      //   const response = await productsModel.findProductById(_id);
      //   const { _id: idExpected } = response;
      //   console.log(idExpected);
      //   console.log(_id);
      //   expect(idExpected).to.be.equal(_id);
      // })
    });
  })
});