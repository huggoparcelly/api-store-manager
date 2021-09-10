// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const addProduct = async ({ name, quantity }) => {
  const products = await mongoConnection.connection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await products.insertOne({ name, quantity });

  return { _id, name, quantity };
};

module.exports = {
  addProduct,
};