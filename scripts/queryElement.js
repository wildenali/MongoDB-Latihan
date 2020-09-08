// $exists  -> Mencocokan document yg memiliki field tersebut
// $type    -> Mencocokan document yg memiliki type field tersebut

// Syntax nya
db.collection.find({
  field: {
    $operator: value,
  },
});

// Contoh
// select * from products where category is null
db.products.find({
  category: {
    $exists: false,
  },
});

// select * from products where type(category) = "string"
db.products.find({
  category: {
    $type: "string",
  },
});

// select * from products where type(price) in ("int", "long")
db.products.find({
  price: {
    $type: ["int", "long"],
  },
});
