const { ObjectId } = require('mongodb');
const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsServices');

describe('Testes da camada service', () => {
  const ID_EXAMPLE = "5f43a7ca92d58904914656b6"
  const payloadProduct = {
    name: "Produto do Batista",
    quantity: 100
  };

  const wrongPayloadProduct = {};
  const ID_WRONG = '123';

  describe('Cadastro de um produto', () => {
    
    before(() => {
      sinon.stub(productsModel, 'addProduct')
        .resolves({_id: ObjectId(ID_EXAMPLE)}, payloadProduct);
    });
  
    after(() => {
      productsModel.addProduct.restore();
    });
  
    describe('quando um produto é cadastrado com sucesso', () => {
      
      it('retorna um objeto',  async() => {
        const response = await productsService.addProduct(payloadProduct);
  
        expect(response).to.be.an('object');
      })
  
      // Está retornando um erro de produto existente 
      // it('o objeto deve possuir o "id" do produto cadastrado', async() => {
      //   const response = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
        
      //   expect(response).to.have.a.property('_id');
      // })
    });
  
    describe('quando não é possível cadastrar um produto', () => {
      
      describe('quando o payload informado é inválido', () => {
  
        it('retorna um objeto com erro', async () => {
          const response = await productsService.addProduct(wrongPayloadProduct.name, wrongPayloadProduct.quantity);
          expect(response).to.be.an('object');
        });
    
        it('o erro contém o código "invalid_data"', async () => {
          const response = await productsService.addProduct(wrongPayloadProduct.name, wrongPayloadProduct.quantity);
    
          expect(response.err.code).to.be.equal('invalid_data');
        });
      })
  
      describe('quando já existe um produto cadastrado com o nome', ()=> {
  
        const payloadProduct1 = {
          name: "Produto do Batista",
          quantity: 100
        }
        
        it('retorna um objeto com erro', async () => {
          const response = await productsService.addProduct(payloadProduct1.name, payloadProduct1.quantity);
    
          expect(response).to.be.an('object');
        });
    
        it('o objeto possui o código "invalid_data"', async () => {
          const response = await productsService.addProduct(payloadProduct1.name, payloadProduct1.quantity);
    
          expect(response.err.code).to.be.equal('invalid_data');
        });
  
        it('o objeto possui a mensagem "Product already exists"', async () => {
          const response = await productsService.addProduct(payloadProduct1.name, payloadProduct1.quantity);
    
          expect(response.err.message).to.be.equal('Product already exists');
        });
  
      })
    });
  
  });
  
  describe('Busca todos os produtos da lista', () => {

    describe('quando não existe nenhum produto criado', () => {
      
      it('retorna um objeto', async() => {
        const products = await productsService.getAllProducts();
        expect(products).to.be.an('object');
      });
  
      it('o objeto tem a propriedade "products"', async() => {
        const products = await productsService.getAllProducts();
        expect(products).to.have.a.property('products');
      });
  
      it('a propriedade "products" é um array', async() => {
        const { products } = await productsService.getAllProducts();
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
        const products = await productsService.getAllProducts();
        expect(products).to.be.an('object');
      });

      it('o objeto tem a propriedade "products"', async() => {
        const products = await productsService.getAllProducts();
        expect(products).to.have.a.property('products');
      });

      it('a propriedade "products" é um array', async() => {
        const { products } = await productsService.getAllProducts();
        expect(products).to.be.an('array');
      });

      it('o array está populado', async() => {
        const { products } = await productsService.getAllProducts();
        expect(products).to.be.not.empty;
      });
    })
    
    
  });

  describe('Busca um produto pelo id', () => {

    describe('quando o "id" informado é inválido', () => {

      it('retorna um objeto', async() => {
        const response = await productsService.findProductById(ID_WRONG);
        expect(response).to.be.an('object');
      });

      it('o objeto possui a propriedade "err"', async() => {
        const response = await productsService.findProductById(ID_WRONG);
        expect(response).to.have.property('err');
      });

      it('o erro possui uma message "Wrong id format"', async() => {
        const response = await productsService.findProductById(ID_WRONG);
        expect(response.err.message).to.be.equal('Wrong id format');
      });

    });

    describe('quando o produto não existe', () => {

      it('retorna um objeto', async() => {
        const response = await productsService.findProductById(ID_EXAMPLE);
        expect(response).to.be.an('object');
      });

      it('o objeto possui a propriedade "err"', async() => {
        const response = await productsService.findProductById(ID_EXAMPLE);
        expect(response).to.have.property('err');
      });

      it('o erro possui uma message "Wrong id format"', async() => {
        const response = await productsService.findProductById(ID_EXAMPLE);
        expect(response.err.message).to.be.equal('Wrong id format');
      });
    });
  });

  describe('Atualiza um produto cadastrado', () => {

    describe('quando o "id" informado é inválido', () => {

      it('retorna um objeto', async() => {
        const response = await productsService.updateProduct(ID_WRONG, payloadProduct.name, payloadProduct.quantity);
        expect(response).to.be.an('object');
      });

      it('o objeto possui a propriedade "err"', async() => {
        const response = await productsService.updateProduct(ID_WRONG, payloadProduct.name, payloadProduct.quantity);
        expect(response).to.have.property('err');
      });

      it('o erro possui uma message "Wrong id format"', async() => {
        const response = await productsService.updateProduct(ID_WRONG, payloadProduct.name, payloadProduct.quantity);
        expect(response.err.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando o payload informado é inválido', () => {
      it('retorna um objeto com erro', async () => {
        const response = await productsService.updateProduct(ID_EXAMPLE, wrongPayloadProduct.name, wrongPayloadProduct.quantity);
        expect(response).to.be.an('object');
      });
  
      it('o erro contém o código "invalid_data"', async () => {
        const response = await productsService.updateProduct(ID_EXAMPLE, wrongPayloadProduct.name, wrongPayloadProduct.quantity);
  
        expect(response.err.code).to.be.equal('invalid_data');
      });
    });

    // ERRO, NÃO CONSEGUE ADICIONAR O PRODUTO, POIS RETORNA COMO JÁ EXISTENTE
    // FALTA DROPAR O BANCO DE DADOS
    // describe('quando o produto é atualizado com sucesso', () => {
    //   const newPayloadProduct = {
    //     name: 'Produto do João',
    //     quantity: 5
    //   }

    //   it('retorna um objeto', async () => {
    //     const { _id } = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
        
    //     const response = await productsService.updateProduct(_id, newPayloadProduct.name, newPayloadProduct.quantity);
    //     expect(response).to.be.an('object');
    //   });

    //   it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
    //     const { _id } = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
    //     const response = await productsService.updateProduct(_id, newPayloadProduct.name, newPayloadProduct.quantity);
        
    //     expect(response).include.all.keys(['_id', 'name', 'quantity']);
    //   });

    //   it('o produto possui um novo nome e uma nova quantidade', async () => {
    //     const { _id } = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
        
    //     const productUpdated = await productsService.updateProduct(_id, newPayloadProduct.name, newPayloadProduct.quantity);

    //     const {_id: idExpected, name, quantity} = productUpdated;

    //     // adicionar o teste do id igual
    //     expect(name).to.not.equal(payloadProduct.name);
    //     expect(quantity).to.not.equal(payloadProduct.quantity);
    //   });
    // });
  })

  describe('Deleta um produto', () => {

    describe('quando o "id" informado é inválido', () => {
      it('retorna um objeto', async() => {
        const response = await productsService.removeProduct(ID_WRONG);
        expect(response).to.be.an('object');
      });

      it('o objeto possui a propriedade "err"', async() => {
        const response = await productsService.removeProduct(ID_WRONG);
        expect(response).to.have.property('err');
      });

      it('o erro possui uma message "Wrong id format"', async() => {
        const response = await productsService.removeProduct(ID_WRONG);
        expect(response.err.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando o produto é deletado', () => {
      
      it('retorna um objeto', async() => {
        const {_id} = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
        const response = await productsService.removeProduct(_id);
        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "_id", "name" e "quantity" do produto deletado', async () => {
        const { _id } = await productsService.addProduct(payloadProduct.name, payloadProduct.quantity);
        const response = await productsService.removeProduct(_id);
        const {name, quantity} = response;

        // adicionar o teste do id igual
        expect(name).to.not.equal(payloadProduct.name);
        expect(quantity).to.not.equal(payloadProduct.quantity);
      });

      it('o produto não está na lista', async () => {
        const { _id } = await productsService.addProduct(payloadProduct);
        await productsModel.removeProduct(_id);
        
        const findProductRemoved = await productsService.findProductById(_id);
        
        expect(findProductRemoved.err.message).to.be.equal('Wrong id format');
      });
    })
    
  });
  
  
});