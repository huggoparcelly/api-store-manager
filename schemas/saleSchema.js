const salesModel = require('../models/salesModel');

const erros = {
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
};

const codes = {
  notFound: 'not_found',
  invalidData: 'invalid_data',
};

const findSale = async (id) => {
  const find = await salesModel.findSalesById(id);
  if (!find) return { err: { code: codes.notFound, message: erros.saleNotFound } };
  return {};
};

const findSaleInvalid = async (id) => {
  const findProd = await salesModel.findSalesById(id);
  if (!findProd) return { err: { code: codes.invalidData, message: erros.wrongSaleId } };
  return {};
};

module.exports = { findSale, findSaleInvalid };