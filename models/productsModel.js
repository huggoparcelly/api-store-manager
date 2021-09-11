const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const addProduct = async ({ name, quantity }) => {
  const products = await connection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await products.insertOne({ name, quantity });

  return { _id, name, quantity };
};

const findProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  const { _id, quantity } = product;
  
  return { _id, name, quantity };
};

const getAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  
  return { products };
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  
  if (!product) return null;

  return product;
};

const updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productUpdated = await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, quantity } }));

  const { _id } = productUpdated;
  
  return { _id, name, quantity };
};

const removeProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productRemoved = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id) }));

  const { _id, name, quantity } = productRemoved;
  return { _id, name, quantity };
};

module.exports = {
  addProduct,
  findProductByName,
  getAllProducts,
  findProductById,
  updateProduct,
  removeProduct,
};