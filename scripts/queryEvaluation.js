/*
$expr       -> Menggunakan aggregation operation
$jsonSchema -> Validasi dicument sesuai dengan JSON schema
$mod        -> Melakukan operasi modulo
$regex      -> Mengambil document sesuai dengan regular expression (PCRE)
$text       -> Melakukan pencarian menggunakan text
$where      -> Mengambil document dengan JavaScript Function
*/

// Syntax $expr
db.collection.find({
  $expr: {
    // aggregation expression
  },
});

// Syntax $jsonSchema
db.collection.find({
  $jsonSchema: {
    // JSON Schema Object
  },
});

// Syntax $mod
db.collection.find({
  field: {
    $mod: [divisor, remainder],
  },
});

// Syntax $regex
db.collection.find({
  field: {
    $regex: /regex/,
    $options: "<option>",
  },
});

// Syntax $text
db.collection.find({
  $text: {
    $search: "string",

    // yg 3 di bawah ini optional
    $language: "string",
    $caseSensitive: "boolean",
    $diacriticSensitive: "boolean",
  },
});

// Syntax $where
db.collection.find({
  $where: function () {
    return true;
  },
});

// Contoh
// select * from products where price > 10000000
db.products.find({
  $expr: {
    $gt: ["$price", 10000000],
  },
});

// select * from customers where toUpper(_id) = "KHANNEDY"
db.customers.find({
  $expr: {
    $eq: [{ $toUpper: "$_id" }, "KHANNEDY"],
  },
});

// select * from products where name is not null and category is not null
db.products.find({
  $jsonSchema: {
    required: ["name", "category"],
  },
});

// select * from products where name is not null and type(name) = 'string' and type(price) = 'long'
db.products.find({
  $jsonSchema: {
    required: ["name"],
    properties: {
      name: {
        bsonType: "string",
      },
      price: {
        bsonType: "long",
      },
    },
  },
});

// select * from products where price % 5 = 0
db.products.find({
  price: {
    $mod: [5, 0],
  },
});

// select * from products where name like "%mie%"
db.products.find({
  name: {
    $regex: /mie/,
    $options: "i", // i itu tida case sensitive
  },
});

// select * from products where name like "Mie%"
db.products.find({
  name: {
    $regex: /^Mie/, // di awali dengan kata Mie
  },
});

// create text index on products
// Sebelum pakai operasi $text, caranya bikin dulu index di field name, kalau mau lebih juga boleh, misal tambah category
db.products.createIndex({
  name: "text",
});
// select * from products where (name like "%mie%"" or name like "%sedap%")
db.products.find({
  $text: {
    $search: "mie sedap",
  },
});
// select * from products where (name like "%mie sedap%")
db.products.find({
  $text: {
    $search: '"mie sedap"',
  },
});

// select * from customers where _id = "Khaneddy"
db.customers.find({
  $where: function () {
    // return this.name == "Eko Kurniawan";
    return this._id == "Khannedy";
  },
});
