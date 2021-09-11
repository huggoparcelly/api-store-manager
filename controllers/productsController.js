const { StatusCodes } = require('http-status-codes');

const productsService = require('../services/productsServices');

const addProduct = (async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.addProduct(name, quantity);

  if (newProduct.err) {
 return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json(newProduct); 
}

  return res.status(StatusCodes.CREATED).json(newProduct);
});

const getAllProducts = (async (_req, res) => {
  const products = await productsService.getAllProducts();

  res.status(StatusCodes.OK).json(products);
});

const findProductById = (async (req, res) => {
  const { id } = req.params;

  const product = await productsService.findProductById(id);

  return res.status(StatusCodes.OK).json(product);
});

module.exports = { 
  addProduct,
  getAllProducts,
  findProductById,
};