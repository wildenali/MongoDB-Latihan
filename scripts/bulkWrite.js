/*
- Komunikasi antara aplikasi dengan database biasanya dilakukan secara request-response
- Artinya setiap perintah yg dikirimkan dari aplikasi ke database akan diresponse langsung oleh database
- Proses tersebut akan sangat lambat, jika kira menghadapi kasus yg harus memanipulasi data besar secara langsung
- Misalnya upload data dari file dengan jumlah jutaan ke dalam database
- MongoDB mendukung Bulk Write Operation, yaitu operasi Bulk yg dalam satu request bisa mengirim banyak perintah
- Fitur ini cocok pada kasus jika kita ingin melakukan operasi bulk atau batch secara banyak sekaligus

Bulk Wite Function
Function                          Keterangan
db.<collection.insertMany()   -> Insert document secara banyak sekaligus
db.<collection.updateMany()   -> Update document secara banyak sekaligus
db.<collection.deleteMany()   -> Delete document secara banyak sekaligus
db.<collection.bulkWrite()    -> Melakukan operasi write (insert, update, delete) banyak secara sekaligus

Supported Bulk Write Operation
- insertOne
- updateOne
- updateMany
- replaceOne
- deleteOne
- deleteMany
*/

// Syntax bulkWrite() Function
db.customers.bulkWrite([
  {
    // operation 1
  },
  {
    // operation 2
  },
  {
    // operation n
  },
]);

// CONTOH
db.customers.bulkWrite([
  {
    insertOne: {
      document: {
        _id: "eko",
        full_name: "Eko",
      },
    },
  },
  {
    insertOne: {
      document: {
        _id: "kurniawan",
        full_name: "Kurniawan",
      },
    },
  },
  {
    insertMany: {
      filter: {
        _id: {
          $in: ["eko", "kurniawan", "Khannedy"],
        },
      },
      update: {
        $set: {
          full_name: "Eko Kurniawan Khannedy",
        },
      },
    },
  },
]);
