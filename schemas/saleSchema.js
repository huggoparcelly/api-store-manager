const { StatusCodes } = require('http-status-codes');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const erros = {
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
  wrongIdOrQuant: 'Wrong product ID or invalid quantity',
  notPermittedSell: 'Such amount is not permitted to sell',
};

const codes = {
  notFound: 'not_found',
  invalidData: 'invalid_data',
  stockProblem: 'stock_problem',
};

const isNotInteger = (value) => (!Number.isInteger(value));
const isLargerThan = (value, min) => (value < min);

const findSale = async (id) => {
  const find = await salesModel.findSalesById(id);
  if (!find) return { err: { code: codes.notFound, message: erros.saleNotFound } };
  return {};
};

const findSaleInvalid = async (id) => {
  const findProd = await salesModel.findSalesById(id);
  if (!findProd) return { err: { code: codes.invalidData, message: erros.wrongSaleId } };
  return {};
};

const isValidQuantity = (sales) => {
  const isNotValid = sales.some((sale) => isNotInteger(sale.quantity) 
    || isLargerThan(sale.quantity, 1));

  if (isNotValid) {
    return { 
          err: { 
            code: codes.invalidData, 
            message: erros.wrongIdOrQuant }, 
            statusCode: StatusCodes.UNPROCESSABLE_ENTITY }; 
}
  return {};
};

const updateQuantity = (sales) => {
  sales.forEach(async (sale) => {
    const product = await productModel.findProductById(sale.productId);
    const newQuantity = product.quantity - sale.quantity;
    const updatedProduct = { id: sale.productId, name: product.name, quantity: newQuantity };
    await productModel.updateProduct(updatedProduct);
  });
};

const saleRemoved = async (id) => {
  const saleFinded = await salesModel.findSalesById(id);
  saleFinded.itensSold.forEach(async (sale) => {
    const product = await productModel.findProductById(sale.productId);
    const newQuantity = product.quantity + sale.quantity;
    const updatedProduct = { id: sale.productId, name: product.name, quantity: newQuantity };
    await productModel.updateProduct(updatedProduct);
  });
};

const isBiggestThan = (value1, value2) => (value1 > value2);

const stockValidate = async (sales) => {
  const ZERO = 0;
  const getProducts = await productModel.getAllProducts();
  
  for (let i = ZERO; i < sales.length; i += 1) {
    const productSale = sales[i];
    const findProduct = getProducts.find(({ _id }) => (
      JSON.stringify(_id) === JSON.stringify(productSale.productId)));
    const validation = isBiggestThan(productSale.quantity, findProduct.quantity);
    if (validation) {
    return {
          err: { 
            code: codes.stockProblem, 
            message: erros.notPermittedSell }, 
            statusCode: StatusCodes.NOT_FOUND }; 
}
  }

  return {};
};

module.exports = { 
  findSale, 
  findSaleInvalid, 
  isValidQuantity, 
  updateQuantity,
  saleRemoved,
  stockValidate,
 };