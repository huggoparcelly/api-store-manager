const salesModel = require('../models/salesModel');

const erros = {
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
  wrongIdOrQuant: 'Wrong product ID or invalid quantity',
};

const codes = {
  notFound: 'not_found',
  invalidData: 'invalid_data',
};

const isNotInteger = (value) => (!Number.isInteger(value));
const isLargerThan = (value, min) => (value < min);

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

const isValidQuantity = (sales) => {
  const isNotValid = sales.some((sale) => isNotInteger(sale.quantity) 
    || isLargerThan(sale.quantity, 1));

  if (isNotValid) return { err: { code: codes.invalidData, message: erros.wrongIdOrQuant } };
  return {};
};

module.exports = { findSale, findSaleInvalid, isValidQuantity };