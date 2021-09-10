// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const addProduct = async ({ name, quantity }) => {
  const products = await mongoConnection.connection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await products.insertOne({ name, quantity });

  return { _id, name, quantity };
};

const findProductByName = async (name) => {
  const product = await mongoConnection.connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  const { _id, quantity } = product;
  
  return { _id, name, quantity };
};

module.exports = {
  addProduct,
  findProductByName,
};