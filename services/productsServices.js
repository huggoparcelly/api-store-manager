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

const getAllProducts = async () => productsModel.getAllProducts();

const findProductById = async (id) => {
  const productNotFound = await productSchema.findProduct(id);
  if (productNotFound.err) return productNotFound;

  return productsModel.findProductById(id);
};

const updateProduct = async (id, name, quantity) => {
  const validations = productSchema.isValidProduct(name, quantity);
  if (validations.err) return validations;

  const productNotFound = await productSchema.findProduct(id);
  if (productNotFound.err) return productNotFound;

  return productsModel.updateProduct({ id, name, quantity });
};

module.exports = { 
  addProduct, 
  getAllProducts, 
  findProductById,
  updateProduct,
};