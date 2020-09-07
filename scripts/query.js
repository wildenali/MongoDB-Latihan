// select * from customers where _id = 'Khannedy'
db.customers.find({
  _id: "Khannedy",
});

// select * from customers where name = 'Eko Kurniawan Khannedy'
db.customers.find({
  name: "Eko Kurniawan",
});

db.customers.find({
  _id: "Khannedy",
  name: "Eko Kurniawan",
});

// select * from products where price = 2000
db.products.find({
  price: 2000,
});

db.products.find({
  name: "Mie Sedap Soto",
});

// select * from orders where item.produk_id = 1
db.orders.find({
  "item.produk_id": 1,
});
