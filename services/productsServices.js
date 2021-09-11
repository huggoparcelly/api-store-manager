const productsModel = require('../models/productsModel');

const addProduct = async ({ name, quantity }) => {
  const existsProduct = await productsModel.findProductByName(name);
  if (existsProduct) {
    return {
        err: { 
          code: 'alreadyExists',
          message: 'Produto já existente', 
        },
      };
     }

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