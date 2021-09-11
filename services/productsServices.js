const productsModel = require('../models/productsModel');
const productSchema = require('../schemas/productSchema');

const addProduct = async (name, quantity) => {
  const validations = productSchema.isValidProduct(name, quantity);
  if (validations.err) return validations;

  const existsProduct = await productSchema.existsProduct(name);
  if (existsProduct.err) return existsProduct;

  const { _id } = await productsModel.addProduct({ name, quantity });
  return { _id, name, quantity };
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  
  if (!products) {
    return {
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      },
    };
  }

  return products;
};

const findProductById = async (id) => {
  const product = await productsModel.findProductById(id);

  if (!product) {
    return {
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      },
    };
  }

  return product;
};

module.exports = { 
  addProduct, 
  getAllProducts, 
  findProductById,
};