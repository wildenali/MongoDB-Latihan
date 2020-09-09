/*
Text Indexes
- MongoDB menyediakan text index untuk mendukung pencarian text di tipe data string.
- Text index tidak hanya bisa digunakan pda field dgn tipe data string, namun juga pada array berisi tipe data string
*/

// Syntax Text Index
db.products.createIndex({
  field1: "text",
  field2: "text",
}, {
  weights: {
    field1: 10,
    field2: 5
  }
})

// CONTOH
// drop current index text
db.products.getIndexes();
db.products.dropIndex("name_text");
db.products.getIndexes(); // cek

// create index text
db.products.createIndex({
  name: "text",
  category: "text",
  tags: "text"
}, {
  weights: {
    name: 10,
    category: 5,
    tags: 1
  }
});

// search products with text "mie"
db.products.find({
  $text: {
    $search: "mie"
  }
});
db.products.find({
  $text: {
    $search: "mie"
  }
}).explain();

// search products with text "mie" OR "laptop"
db.products.find({
  $text: {
    $search: "mie laptop"
  }
});

// search products with text "mie sedap"
db.products.find({
  $text: {
    $search: "mie sedap"
  }
});

// search products with text "mie" and NOT "sedap"
db.products.find({
  $text: {
    $search: "mie -sedap"
  }
});

// Debug query optimization
db.products.find({
  $text: {
    $search: "mie -sedap"
  }
}).explain();