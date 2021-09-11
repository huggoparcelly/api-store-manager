const productsModel = require('../models/productsModel');

const erros = {
  nameNotString: '"name" must be a string',
  nameLength: '"name" length must be at least 5 characters long',
  quantityNotNumber: '"quantity" must be a number',
  quantityLength: '"quantity" must be larger than or equal to 1',
  existsProduct: 'Product already exists',
};

const isNotString = (value) => (typeof value !== 'string');
const isLengthLetterThan = (value, min) => (value.length < min);
const isNotInteger = (value) => (!Number.isInteger(value));
const isLargerThan = (value, min) => (value < min);

const isValidProduct = (name, quantity) => {
  const code = 'invalid_data';
  switch (true) {
    case isNotString(name): return { err: { code, message: erros.nameNotString } };
    case isLengthLetterThan(name, 5): return { err: { code, message: erros.nameLength } };
    case isNotInteger(quantity): return { err: { code, message: erros.quantityNotNumber } };
    case isLargerThan(quantity, 1): return { err: { code, message: erros.quantityLength } };

    default: return {};
  }
};

const existsProduct = async (name) => {
  const existsProd = await productsModel.findProductByName(name);
  
  if (existsProd) return { err: { code: 'invalid_data', message: erros.existsProduct } };
  
  return {};
};

const findProduct = async (id) => {
  const findProd = await productsModel.findProductById(id);
  if (!findProd) return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  return {};
};

module.exports = { isValidProduct, existsProduct, findProduct };