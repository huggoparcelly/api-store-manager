const productsModel = require('../models/productsModel');

const productIsvalid = (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) return false;
  if (typeof quantity !== 'number' || quantity < 0) return false;
  return true;
};

const addProduct = async ({ name, quantity }) => {
  if (!productIsvalid(name, quantity)) return false;
  
  // const existsProduct = await productsModel.findProductByName(name);
  // if (existsProduct) return false;

  const { _id } = await productsModel.addProduct({ name, quantity });

  return { _id, name, quantity };
};

module.exports = { addProduct };