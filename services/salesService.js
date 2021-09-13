const salesModel = require('../models/salesModel');
const saleSchema = require('../schemas/saleSchema');

const addSale = async (sales) => {
  const validation = saleSchema.isValidQuantity(sales);
  if (validation.err) return validation;

  return salesModel.addSale(sales);
};

const getAllSales = async () => salesModel.getAllSales();

const findSalesById = async (id) => {
  const saleNotFound = await saleSchema.findSale(id);
  if (saleNotFound.err) return saleNotFound;

  const saleFinded = await salesModel.findProductById(id);

  const { _id, intensSold } = saleFinded;

  return { _id, intensSold };
};

const updateSale = async (id, sale) => {
  const validation = saleSchema.isValidQuantity(sale);
  if (validation.err) return validation;

  const saleNotFound = await saleSchema.findSale(id);
  if (saleNotFound.err) return saleNotFound;

  const saleUpdated = await salesModel.updateSale(id, sale);
  
  const { _id } = saleUpdated;
  
  return { _id, itensSold: sale };
};

const removeSale = async (id) => {
  const saleNotFound = await saleSchema.findSaleInvalid(id);
  if (saleNotFound.err) return saleNotFound;

  return salesModel.removeSale(id);
};

module.exports = { 
  addSale, 
  getAllSales,
  findSalesById,
  updateSale,
  removeSale,
};