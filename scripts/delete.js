/*
- MongoDB memiliki function yg bisa digunakan untuk menghapus document di collection secara permanent
- Document yg sudah dihapus tidak bisa dikembalikan lagi

Function                              Keterangan
db.<collection>.deleteOne(query)  -> Menghapus satu document yg sesuai dengan kondisi query
db.<collection>.deleteMany(query) -> Menghapus banyak document yg sesuai dengan kondisi query
*/

// Untuk supaya tidak menghapus data yg ada, awalnya kita masukan data tambahan dulu
// Insert spammer document
db.customers.find(); // Cek dulu
db.customers.insertOne({
  _id: "spammer",
  full_name: "Spammer",
});

// Delete document by _id
db.customers.find(); // Cek dulu
db.customers.deleteOne({
  _id: "spammer",
});
db.customers.find(); // Cek hasil

// Untuk simulasi delete banyak supaya tidak menghapus data yg ada, awalnya kita masukan data-data tambahan dulu
// Insert spammer document
db.customers.insertMany([
  {
    _id: "spammer1",
    full_name: "Spammer1",
  },
  {
    _id: "spammer2",
    full_name: "Spammer2",
  },
  {
    _id: "spammer3",
    full_name: "Spammer3",
  },
]);

// Delete many document
db.customers.find(); // Cek dulu
db.customers.deleteMany({
  _id: {
    $regex: "spammer",
  },
});
db.customers.find(); // Cek hasil
