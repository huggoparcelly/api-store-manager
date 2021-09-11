const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const addProduct = async ({ name, quantity }) => {
  const products = await mongoConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await products.insertOne({ name, quantity });

  return { _id, name, quantity };
};

const findProductByName = async (name) => {
  const product = await mongoConnection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  const { _id, quantity } = product;
  
  return { _id, name, quantity };
};

const getAllProducts = async () => {
  const products = await mongoConnection()
    .then((db) => db.collection('products').find().toArray());

  if (!products.length) return null;
  
  return { products };
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await mongoConnection()
    .then((db) => db.collection.findOne(new ObjectId(id)));
  
  if (!product) return null;

  return product;
};

module.exports = {
  addProduct,
  findProductByName,
  getAllProducts,
  findProductById,
};