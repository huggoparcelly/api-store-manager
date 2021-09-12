const salesModel = require('../models/salesModel');
// const productSchema = require('../schemas/productSchema');

const addSale = async (sales) => {
  // VALIDAÇÃO QUE O PRODUTO EXISTE, PROBLEMA EM RETIRAR O ID e  DO ARRAY

  const newSale = await salesModel.addSale(sales);

  return newSale;
};

const getAllSales = async () => salesModel.getAllSales();

module.exports = { addSale, getAllSales };