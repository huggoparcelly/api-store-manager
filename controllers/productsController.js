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

  res.status(StatusCodes.OK).json({ products });
});

const findProductById = (async (req, res) => {
  const { id } = req.params;

  const product = await productsService.findProductById(id);

  if (product.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(product);

  return res.status(StatusCodes.OK).json(product);
});

const updateProduct = (async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdated = await productsService.updateProduct(id, name, quantity);
 
  if (productUpdated.err) {
 return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json(productUpdated); 
}
  
  return res.status(StatusCodes.OK).json(productUpdated);
});

const removeProduct = (async (req, res) => {
  const { id } = req.params;

  const productRemoved = await productsService.removeProduct(id);
  if (productRemoved.err) {
 return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json(productRemoved); 
}

  return res.status(StatusCodes.OK).json(productRemoved);
});

module.exports = { 
  addProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  removeProduct,
};