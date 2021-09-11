// const sinon = require('sinon');
// const { expect } = require('chai');

// const productsService = require('../../services/productsServices');
// const productsController = require('../../controllers/productsController');

// describe('Cadastro de um produto no controller', ()=> {
//   describe('quando um produto é cadastrado com sucesso', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {
//         name: "Produto do Batista",
//         quantity: 100
//       };

//       response.status = sinon.stub()
//         .returns(response);
//       response.json = sinon.stub()
//         .returns();

//       sinon.stub(productsService, 'addProduct')
//         .resolves(true);
//     });

//     after(() => {
//       productsService.addProduct.restore();
//     });

//     it('é chamado o status com o código 201', async () => {
//       await productsController.addProduct(request, response);

//       expect(response.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é retornar um objeto', async () => {
//       const controllerResponse = await productsController.addProduct(request, response);

//       expect(controllerResponse).to.be.an('objetct');
//     });

//     it('o objeto deve ter as propriedades "_id", "name", "quantity"', async () => {
//       const controllerResponse = await productsController.addProduct(request, response);

//       expect(controllerResponse).to.include.all.keys(["_id", "name", "quantity"]);
//     });
//   })

//   // describe('quando não é possível cadastrar um produto', () => {

//   //   describe('quando o payload informado é inválido', () => {

//   //   })
//   // })

// });