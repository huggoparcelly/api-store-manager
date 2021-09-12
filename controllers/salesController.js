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

const findSalesById = (async (req, res) => {
  const { _id } = req.params;

  const sale = await salesService.findSalesById(_id);

  if (sale.err) return res.status(StatusCodes.NOT_FOUND).json(sale);
  
  return res.status(StatusCodes.OK).json(sale);
});

module.exports = { 
  addSale, 
  getAllSales, 
  findSalesById,
};