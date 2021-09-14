const salesModel = require('../models/salesModel');
const saleSchema = require('../schemas/saleSchema');

const addSale = async (sales) => {
  const validation = saleSchema.isValidQuantity(sales);
  if (validation.err) return validation;

  const stockValidate = await saleSchema.stockValidate(sales);
  if (stockValidate.err) return stockValidate;

  await saleSchema.updateQuantity(sales);

  return salesModel.addSale(sales);
};

const getAllSales = async () => salesModel.getAllSales();

const findSalesById = async (id) => {
  const saleNotFound = await saleSchema.findSale(id);
  if (saleNotFound.err) return saleNotFound;

  const saleFinded = await salesModel.findSalesById(id);
  
  const { _id, itensSold } = saleFinded;

  return { _id, itensSold };
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
  
  await saleSchema.saleRemoved(id);

  return salesModel.removeSale(id);
};

module.exports = { 
  addSale, 
  getAllSales,
  findSalesById,
  updateSale,
  removeSale,
};