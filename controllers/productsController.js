const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const productsService = require('../services/productsServices');

const addProduct = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().positive().required(),
  }).validate(req.body);

  if (error) return next(error);

  const newProduct = await productsService.addProduct(req.body);
  
  if (newProduct.error) return next(newProduct.error);

  return res.status(StatusCodes.CREATED).json(newProduct);
});

module.exports = { addProduct };