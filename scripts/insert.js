// Insert document customers
db.customers.insertOne({
  _id: "Khannedy",
  name: "Eko Kurniawan",
});

// Insert document products
db.products.insertMany([
  {
    _id: 1,
    name: "Indomie Ayam Bawang",
    price: new NumberLong(2000),
  },
  {
    _id: 2,
    name: "Mie Sedap Soto",
    price: new NumberLong(1800),
  },
]);

// Insert document orders
db.orders.insertOne({
  _id: new ObjectId(), // auto generate
  total: new NumberLong(8000),
  item: [
    {
      produk_id: 1,
      price: new NumberLong(2000),
      quantity: new NumberInt(2),
    },
    {
      produk_id: 2,
      price: new NumberLong(2000),
      quantity: new NumberInt(2),
    },
  ],
});
