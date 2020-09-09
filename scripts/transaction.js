/*
Transaction
- Di Relational DB, fitur yg sangat berguna dan banyak orang gunakan adalah fitur transaction
- Fitur transaction secara sederhana adalah menggabungkan beberapa operasi database delam satu transaction,
  dimana transaction akan dianggap sukses jika semua operasi sukses, dan
  transaction akan dianggap gagal jika ada salah satu operasi yang gagal
- Dan jika transaction gagal, maka seluruh operasi yang sukses sebelumnya harus dibatalkan (rollback)
- Fitur transaction di MongoDB hanya bisa jalan di CLUSTER (REPLICA-SET), tidak di single node
- Dalam CLUSTER, Database di MongoDB akan memiliki primary data dan secondary data


// Transaction Function
Function                        Keterangan
session.startTransaction()  -> Memulai transaksi
session.commitTransaction() -> Commit transaksi
session.abortTransaction()  -> Membatalkan transaksi


// Read Preferences
Read preferences adaah bagaimana MongoDB menkontrol dari mana kita membaca data
- primary           -> Semua query diambil dari primary replica set
- primaryPrefered   -> Semua query diambil dari primary replica set,
                        namun jika tidak primary repica set, maka diambil dari secondary replica set
- secondary         -> Semua query diambil dari secondary replica set
- secondaryPrefered -> Semua query diambil dari secondary replica set, namun jika tidak ada
                        secondary replica set, maka diambil dari primary replica set
- nearest           -> Semua query diambil dari replica set paling murah network latency nya


// Read Concern
Read Concern adalah bagaimana MongoDB mengkontrol data yg kita dapatkan
- local         -> Data akan didapatkan di local node
- available     -> Data akan didapatkan dimanapun (tidak peduli node mana)
- mejority      -> Data akan didapatkan di mayoritas data di semua node
- liniearizable -> Data akan dipastikan data paling terbaru di semua node
- snapshot      -> Data akan diambil dari mayoritas data snapshot (data yg telah dicommit) di semua node


// Write Concern
Write Concern adalah bagaimana MongoDB mengkontrol operasi wire(insert, update, delete)
- <number> : Operasi dianggap sukses jika sudah berhasil melakukan operasi write di node sejumlah <number>
- majority : Operaasi dianggap sukses jika sudah berhasil melakukan operasi write di mayoritas node
*/

// Setting replication
rs.initiate(
  {
    _id: 'my-mongo-set',
    members: [
      { _id: 0, host: "mongo1: 27017" },
      { _id: 1, host: "mongo2: 27017" },
      { _id: 2, host: "mongo3: 27017" }
    ]
  }
);

// Create Collection
db.createCollection("products");
db.createCollection("orders");

// Insert Products
db.products.insertMany([
  {
    _id: 1,
    name: "Indomie Ayam Bawang",
    price: new NumberLong(2000),
    quantity: 10
  },
  {
    _id: 2,
    name: "Indomie Sedap",
    price: new NumberLong(1800),
    quantity: 14
  },
]);

// Simple abort transaction
var session = db.getMongo().startSession({ readPreference: { mode: "primary" } });
session.startSession({ readConcern: { level: "majority" }, writeConcern: { w: "majority" } });
session.getDatabase("test").orders.insertOne({
  _id: new ObjectId(),
  total: new NumberLong(8000),
  items: [
    {
      product_id: 1,
      price: new NumberLong(2000),
      quantity: new NumberInt(2)
    },
    {
      product_id: 2,
      price: new NumberLong(2000),
      quantity: new NumberInt(2)
    },
  ]
})

session.getDatabase("test").products.updateOne(
  {
    _id: 1,
  },
  {
    $inc: {
      quantity: -2
    }
  }
);

session.getDatabase("test").products.updateOne(
  {
    _id: 2,
  },
  {
    $inc: {
      quantity: -2
    }
  }
);

session.abortTransaction();
session.endSession();

// Sample Commit Transaction
var session = db.getMongo().startSession({ readPreference: { mode: "primary" } });
session.startSession({ readConcern: { level: "majority" }, writeConcern: { w: "majority" } });
session.getDatabase("test").orders.insertOne(
  {
    _id: new ObjectId(),
    total: new NumberLong(8000),
    items: [
      {
        product_id: 1,
        price: new NumberLong(2000),
        quantity: new NumberInt(2)
      },
      {
        product_id: 2,
        price: new NumberLong(2000),
        quantity: new NumberInt(2)
      },
    ]
  }
);

session.getDatabase("test").products.updateOne(
  {
    _id: 1
  },
  {
    $inc: {
      quantity: -2
    }
  }
);

session.getDatabase("test").products.updateOne(
  {
    _id: 2
  },
  {
    $inc: {
      quantity: -2
    }
  }
);

session.commitTransaction();
session.endSession();