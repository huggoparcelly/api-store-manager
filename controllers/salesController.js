const { StatusCodes } = require('http-status-codes');

const salesService = require('../services/salesService');

const addSale = (async (req, res) => {
  const newSale = await salesService.addSale(req.body);

  if (newSale.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
       .json(newSale); 
   }

  return res.status(StatusCodes.OK).json(newSale);
});

const getAllSales = (async (req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(StatusCodes.OK).json(sales);
});

const findSalesById = (async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.findSalesById(id);

  if (sale.err) return res.status(StatusCodes.NOT_FOUND).json(sale);
  
  return res.status(StatusCodes.OK).json(sale);
});

const updateSale = (async (req, res) => {
  const { id } = req.params;
  const saleUpdated = await salesService.updateSale(id, req.body);
  
  if (saleUpdated.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
       .json(saleUpdated); 
   }

  return res.status(StatusCodes.OK).json(saleUpdated);
});

const removeSale = (async (req, res) => {
  const { id } = req.params;
  
  const saleRemoved = await salesService.removeSale(id);
  if (saleRemoved.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
       .json(saleRemoved); 
   }

  return res.status(StatusCodes.OK).json(saleRemoved);
});

module.exports = { 
  addSale, 
  getAllSales, 
  findSalesById,
  updateSale,
  removeSale,
};