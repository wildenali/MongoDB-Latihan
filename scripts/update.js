/*
- Berbeda dengan perintah SQL, di MongoDB untuk mengubah document kita diberikan beberapa function
- db.<collection>.<updateFunction>()

Update Document Function
Operator          Keterangan
updateOne()   -> Mengubah satu document
updateMany()  -> Mengubah banyak document sekaligus
replaceOne()  -> Mengubah total satu document dengan document baru
*/

// Syntax updateOne() Function
db.collection.updateOne(
  {}, // filter
  {}, // update
  {} // option
);

// Syntax updateMany() Function
db.collection.updateMany(
  {}, // filter
  {}, // update
  {} // option
);

// Syntax replaceOne() Function
db.collection.replaceOne(
  {}, // filter
  {}, // replacement
  {} // option
);

// CONTOH
// update products set category = "food" where _id = 1
db.products.find({
  _id: 1,
});
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $set: {
      category: "food",
    },
  }
);
// cek
db.products.find({
  _id: 1,
});

// update products set category = "food" where _id = 2
db.products.find({
  _id: 2,
});
db.products.updateOne(
  {
    _id: 2,
  },
  {
    $set: {
      category: "food",
    },
  }
);
// cek
db.products.find({
  _id: 2,
});

// update products set tags = ["food"] where category = "food" and tags is null
db.products.updateOne(
  {
    $and: [
      {
        category: {
          $eq: "food",
        },
      },
      {
        tags: {
          $exists: false,
        },
      },
    ],
  },
  {
    $set: {
      tags: "food",
    },
  }
);
// cek
db.products.find();

// update products set wrong = "wrong"
db.products.find();
db.products.updateMany({}, [
  // semua di isi wrong: "wrong"
  {
    $set: {
      wrong: "wrong",
    },
  },
]);
// cek
db.products.find();

// update products set wrong = null
db.products.find();
db.products.updateMany({}, [
  // semua di isi wrong: null
  {
    $set: {
      wrong: null,
    },
  },
]);
// cek
db.products.find();

// Menghapus field nya, contoh ngehapus field si wrong
db.products.find();
db.products.updateMany({}, [
  {
    $unset: ["wrong"],
  },
]);
// cek
db.products.find();

// insert wrong documents ,,, misal salah masukin document
db.products.insertMany([
  {
    _id: 9,
    name: "Ups Salah",
    wrong: "Salah lagi",
  },
]);
// replace document with id 9
db.products.replaceOne(
  {
    _id: 9,
  },
  {
    name: "Adidas Pulseboost HD Running Shoes Sepatu Lari Pria",
    price: new NumberLong(1100000),
    category: "shoes",
    tags: ["adidas", "shoes", "running"],
  }
);
// cek
db.products.find();
