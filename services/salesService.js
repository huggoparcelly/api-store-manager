const salesModel = require('../models/salesModel');
const saleSchema = require('../schemas/saleSchema');

const addSale = async (sales) => {
  // VALIDAÇÃO QUE O PRODUTO EXISTE, PROBLEMA EM RETIRAR O ID e QUANTITY DO ARRAY

  const newSale = await salesModel.addSale(sales);

  return newSale;
};

const getAllSales = async () => salesModel.getAllSales();

const findSalesById = async (id) => {
  const saleNotFound = await saleSchema.findSale(id);
  if (saleNotFound.err) return saleNotFound;

  const saleFinded = await salesModel.findProductById(id);

  const { _id, intensSold } = saleFinded;

  return { _id, intensSold };
};

const removeSale = async (id) => {
  const saleNotFound = await saleSchema.findSale(id);
  if (saleNotFound.err) return saleNotFound;

  return salesModel.removeSale(id);
};

module.exports = { 
  addSale, 
  getAllSales,
  findSalesById,
  removeSale,
};