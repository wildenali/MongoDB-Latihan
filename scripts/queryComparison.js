/*
$eq   -> equal
$gt   -> great than
$gte  -> great than equal
$lt   -> less than
$lte  -> less than equal
$in   -> Membandingkan value dengan value yg ada di array
$nin  -> Membandingkan value tidak ada dalam value yg ada di array
$ne   -> NOT
*/

// cara nulisnya
db.customers.find({
  field: {
    $operator: "value",
  },
});

// Contohnya
// select * from customers where _id = 'Khennedy;
db.customers.find({
  _id: {
    $eq: "Khannedy",
  },
});

// select * from customers where price > 1000
db.products.find({
  price: {
    $gt: 1000,
  },
});

// select * from customers where price > 1900
db.products.find({
  price: {
    $gt: 1900,
  },
});

// select * from customers where price >= 2000
db.products.find({
  price: {
    $gte: 2000,
  },
});

// insert product documents
db.products.insertMany([
  {
    _id: 3,
    name: "Pop Mie Rasa Bakso",
    price: new NumberLong(2500),
    category: "food",
  },
  {
    _id: 4,
    name: "Samsung Galaxy S11",
    price: new NumberLong(21000000),
    category: "smartphone",
  },
  {
    _id: 5,
    name: "Acer Predator XXi",
    price: new NumberLong(25000000),
    category: "laptop",
  },
]);

// select * from products wheere category in ('handphone', 'smartphone', 'laptop')
db.products.find({
  category: {
    $in: ["smartphone", "laptop"],
  },
  price: {
    $gt: 21000000,
  },
});
