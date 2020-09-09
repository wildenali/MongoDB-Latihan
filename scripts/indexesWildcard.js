/*
Wildcard Indexes
- MongoDB mendukung wildcard index, dimana ini digunakan untuk membuat index terhadap
  field yg belum diketahui atau field yg sering berubah-ubah
- Misal contoh kita punya sebuah embedded document dengan tipe field customFields,
  dimana isinya bisa bebas sesuai dengan data yang dimasukkan
- Agarbisa mendukung proses query yg cepat pada field tersebut, kita bisa menggunakan wildcard Index
*/

// Syntax Wildcard Index
db.customers.createIndex({
  "field.$**": 1,
});

// CONTOH
db.customers.find();  // cek dulu
db.customers.getIndexes();  // cek dulu
// membuat wildcard index
db.customers.createIndex({
  "customFields.%**": 1,  // 1 artinya accepting
})
db.customers.getIndexes();  // cek lagi

// Insert many customers
db.customers.insertMany([
  {
    _id: "budi",
    full_name: "Budi",
    customFields: {
      hobby: "Gamming",
      university: "Universitas Belum Ada"
    }
  },
  {
    _id: "joko",
    full_name: "Joko",
    customFields: {
      ipk: 3.2,
      university: "Universitas Belum Ada"
    }
  },
  {
    _id: "rudi",
    full_name: "Rudi",
    customFields: {
      motherName: "Tini",
      passion: "Enterpreneur"
    }
  },
])
db.customers.getIndexes();  // cek lagi
db.customers.find();  // cek lagi

// Debug wildcard index
db.customers.find({
  "customFields.passion": "Enterpreneur"
}).explain();
db.customers.find({
  "customFields.ipk": 3.2
}).explain();
db.customers.find({
  "customFields.hobby": "Gaming"
}).explain();