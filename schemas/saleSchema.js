const salesModel = require('../models/salesModel');

const findSale = async (id) => {
  const find = await salesModel.findSalesById(id);
  if (!find) return { err: { code: 'not_found', message: 'Sale not found' } };
  return {};
};

module.exports = { findSale };