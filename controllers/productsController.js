const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const productsService = require('../services/productsServices');

const addProduct = rescue(async (req, res, next) => {
  const { err } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().positive().required(),
  }).validate(req.body);

  if (err) return next(err);

  const newProduct = await productsService.addProduct(req.body);

  if (newProduct.err) return next(newProduct.err);

  return res.status(StatusCodes.CREATED).json(newProduct);
});

const getAllProducts = rescue(async (_req, res, next) => {
  const products = await productsService.getAllProducts();
  
  if (products.err) return next(products.err);

  res.status(StatusCodes.OK).json(products);
});

const findProductById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.findProductById(id);
  if (product.err) return next(product.err);

  return res.status(StatusCodes.OK).json(product);
});

module.exports = { 
  addProduct,
  getAllProducts,
  findProductById,
};