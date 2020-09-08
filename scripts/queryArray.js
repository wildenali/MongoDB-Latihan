/*
Array Operator
$all        -> Mencocokkan array yang mengandung element-element tertentu
$elemMatch  -> Mengambil document jika tiap element di array memenuhi kondisi tertentu
$size       -> Mengambil document jika ukuran array sesuai
*/

// Syntax $all
db.collection.find({
  field: {
    $all: ["value"],
  },
});

// Syntax $elemMatch
db.collection.find({
  field: {
    $elemMatch: {
      // query1,
      // query2,
    },
  },
});

// Syntax $size
db.collection.find({
  field: {
    $size: 1,
  },
});

// Contoh
// Sebelum query array, kita coba tambahin data ke product supaya ada array di productnya
// insert some products with tags
db.products.insertMany([
  {
    _id: 6,
    name: "Logitech M235 Wireless Mouse",
    price: new NumberLong(175000),
    category: "laptop",
    tags: ["logitech", "mouse", "accessories"],
  },
  {
    _id: 7,
    name: "Havit Cooler Pad Gaming 5Fan Blue led F2082",
    price: new NumberLong(200000),
    category: "laptop",
    tags: ["cooler", "laptop", "accessories", "fan"],
  },
  {
    _id: 8,
    name: "Samsung LC24F390FHEXXD Curved Monitor ",
    price: new NumberLong(1750000),
    category: "computer",
    tags: ["samsung", "monitor", "computer"],
  },
]);

// select * from products where (tags = "samsung" and tags = "monitor")
db.products.find({
  tags: {
    $all: ["samsung", "monitor"], // harus ada kata samsung dan monitor nya (and)
  },
});

// select * from products where tags in("samsung", "logitech")
db.products.find({
  tags: {
    $in: ["samsung", "logitech"], // yg penting ada kata samsung dan logitech nya (or)
  },
});

// select * from products where size(tags) = 3
db.products.find({
  tags: {
    $size: 3, // Mengeluarkan produk yg ada 3 buah tags didalamnya
  },
});
