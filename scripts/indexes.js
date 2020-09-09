/*
- Indexes adalah fitur di MongoDB untuk mengefisiensikan proses query.
Tanpa index, MongoDB harus melakukan proses query dengan cara collection scan
(Mencari keseluruhan data dari awal sampai akhir)
- Jika terdapat Index pada collection MongoDB, MongoDB bisa menggunakan Index
tersebut untuk mendapatkan data, tanpa harus melakukan pencarian keseluruhan document
- Index adalah struktur data khusus yg menyimpan data dalam strktur yg mudah untuk dicari
- Index menyimpan spesifik field, lalu mengurutkan data field tersebut.
Hal ini tidak hanya mempermudah ketika proses pencarian,
namun mempermudah ketika kita butuh melakukan pencarian dalam bentuk range document (seperti paging)
- Secara dasar, Index di MongoDB, cara kerjanya sama seperti Index di Relational DB

Create Index Function
Function                          Keterangan
db.<collection>.createIndex() -> Membuat index di collection
db.<collection>.getIndexes()  -> Melihat semua index di collection
db.<collection>.dropIndex()   -> Menghapus index di collection
*/

/*
Single Field Index
- Secara default, field _id di MongoDB sudah di index secara otomatis,
jadi kita tidak perlu membuat index lagi secara manual untuk field _id
- MongoDB mendukung penuh pembuatan index di semua field yang ada di document.
Dengan begitu, ini bisa mempercepat proses query di MongoDB untuk query terhadap field tersebut
*/
// Syntax Single Field Index
db.products.createIndex({
  field: 1, // ascending
});

db.products.createIndex({
  field: -1, // descending
});

/*
Compound Indexes
- Jika kita butuh melakukan query terhadap lebih dari satu field,
kita juga bisa membuat index terhadap lebih dari satu field (Compound Index)
- MongoDB membatasi pembuatan maksimal field yg bisa di buath di compound index adalah 32 field
*/
// Syntax Compound Field Index
db.collection.createIndex({
  field1: 1,
  field2: -1,
});

// Create index at category in products collection
db.products.createIndex({
  category: 1,
});

// Get all indexes in products collection
db.products.getIndexes();

// Find products by category (will use index)
db.products.find({
  category: "food",
});

// Debugging query optimization
db.products.find({
  category: "food",
}).explain();
db.products.find({}).sort({
  category: 1,
}).explain();

// Create index at price and tags in products collection
db.products.createIndex({
  stock: 1,
  tags: 1,
});
db.products.getIndexes(); // cek

// Find products by stock and tags (will use index)
db.products.find({
  stock: 10,
  tags: "popular",
});

// Debugging query optimization
db.products.find({
  stock: 10,
}).explain();
db.products.find({
  stock: 10,
  tags: "popular",
}).explain();
db.products.find({
  tags: "popular",
}).explain();
