// const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const addSale = async (sale) => {
  const products = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId: _id } = await products.insertOne({ itensSold: sale });

  return { _id, itensSold: sale };
};

const getAllSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return { sales };
};

module.exports = { addSale, getAllSales };