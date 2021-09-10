const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('No cadastro de um produto', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  
  const ID_EXAMPLE = "5f43a7ca92d58904914656b6"
  const payloadProduct = {
      name: "Produto do Batista",
      quantity: 100
  }

  before(async () => {
    
    const URLMock = await DBServer.getUri();
    
    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('model_example'));
    
    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });
  
  after(() => {
    mongoConnection.connection.restore();
  });

  describe('quando um produto é cadastrado com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.addProduct(payloadProduct);

      expect(response).to.be.an('object');
    });

    it('o objeto deve deve possuir o "id" do novo produto adicionado', async() => {
      const response = await productsModel.addProduct(payloadProduct);

      expect(response).to.have.a.property('_id');
    })

    it('deve existir um produto com o nome cadastrado', async() => {
      await productsModel.addProduct(payloadProduct);
      const productCreated = await connectionMock.collection('products').findOne({ name: payloadProduct.name });
      expect(productCreated).to.be.not.null;
    })
  })
});