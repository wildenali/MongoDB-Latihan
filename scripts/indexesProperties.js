/*
- MongoDB mendukung properties di index
- Istilah properties di Index mungkin agak sedikit membingungkan,
  Sederhananya adalah menambahkan behaviour atau kemampuan tertentu terhadap index yg kita buat

TTL Index
- TTL singakatan dari Time To Live, yaitu waktu untuk hidup
- TTL Index digunakan sebagai waktu hidup document di collection,
  artinya data akan hilang dalam kurun waktu tertentu secara otomatis
- TTL Index hanya dapat digunakan di field dengan tipe data Date
- Background proses di MongoDB akan secara regulat melakukan penghapusan data secara otomatis
- Sayangnya, proses background tersebut berjalan setiap 60 detik sekali
*/

// Syntax TTL Index
db.collection.createIndex(
  {
    field: 1,
  },
  {
    expireAfterSeconds: 10,  // setelah detik ke 10, datanya akan dihapus karena expired
  }
);


/*
Unique Index
- Unique Index memastikan bahwa field-field di index tersebut tidak menyimpan data duplicate.
- Contohnya di MongoDB, field _id secara otomatis merupakan unique index, sehingga kita tidak
  bisa membuat document dengan field _id yg sama
*/
// Syntax Unique Index
db.collection.createIndex(
  {
    field: 1,
  },
  {
    unique: true
  }
);


// Create session collection
db.createCollection("sessions");

// cek dulu
// show collections;  di mongo.exe

// Create TTL Index
db.sessions.createIndex({
  createdAt: 1
}, {
  expireAfterSeconds: 10
})
db.sessions.getIndexes(); // cek

// Will expire after 10 seconds, but background job run every 60 seconds
db.sessions.insertOne({
  _id: 1,
  session: "Session 1",
  createdAt: new Date()
});
db.sessions.find(); // cek

// Update all customers email
db.customers.find(); // cek dulu
db.customers.updateMany(
  {},
  [
    {
      $set: {
        email: {
          "$concat": ["$_id", "@", "example.com"]
        },
      },
    },
  ]
);
db.customers.find(); // cek hasil

// Create unique index
db.customers.createIndex(
  {
    email: 1
  },
  {
    unique: true
  }
);
db.customers.find({
  email: "eko@example.com",
})

// failed duplicate email
db.customers.insertOne(
  {
    _id: "gagal",
    full_name: "Gagal",
    email: "eko@example.com"
  }
)