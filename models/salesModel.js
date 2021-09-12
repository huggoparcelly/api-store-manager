const { ObjectId } = require('mongodb');
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

const findSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  
  if (!sale) return null;

  return sale;
};

// const updateSale = async() => {

// };

const removeSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleRemoved = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: new ObjectId(id) }));

  const { _id, itensSold } = saleRemoved;
  return { _id, itensSold };
};

module.exports = { 
  addSale, 
  getAllSales, 
  findSalesById,
  // updateSale,
  removeSale,
};