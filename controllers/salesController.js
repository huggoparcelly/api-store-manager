const { StatusCodes } = require('http-status-codes');

const salesService = require('../services/salesService');

const addSale = (async (req, res) => {
  // RETIRAR O PRODUCTID E A QUANTITY DE DENTRO DO ARRAY AQUI ???

  const newSale = await salesService.addSale(req.body);
  return res.status(StatusCodes.OK).json(newSale);
});

const getAllSales = (async (req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(StatusCodes.OK).json(sales);
});

module.exports = { addSale, getAllSales };