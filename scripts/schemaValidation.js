/*
Schema Validation
- Pada Telational DB, biasanya menambahkan constraint terhadap data yg adadi tabel
- Misal, maksimal karakter, Enum string, Not Null, dll
- Di MongoDB, fitur untuk validasi data lebih cangghi dibanding constraint di Relational DB
- MongoDB mendukung Schema Validation menggunakan JSON Schema

JSON Schema
- JSON Schema adalah standar resmi untuk validasi data JSON
- Dengan menggunakan JSON Schema, kita bisa member batasa, data JSON apa yg valid, sehingga bisa di masukkan ke dalam collection
- http://json-schema.org/
*/

// Syntax Create Collection dengan Validator
db.createCollection("collection", {
  validator: {
    $jsonSchema: {
      // json schema
    },
  },
});

// Syntax Update Collection dengan Validator
db.runCommand({
  collMod: "collection",
  validationAction: "error",
  validator: {
    $jsonSchema: {
      // json schema
    },
  },
});

// CONTOH
// Create Category Collection
db.createCollection("merchants", {
  validationAction: "error",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "balance", "type", "address"],
      properties: {
        name: {
          bsonType: "string",
          description: "Must be a string",
        },
        balance: {
          bsonType: "long",
          description: "Must be a long",
        },
        type: {
          enum: ["PREMIUM", "REGULAR"],
          description: "Can only be one of enum values",
        },
        address: {
          bsonType: "object",
          required: ["street", "city"],
          properties: {
            street: {
              bsonType: "string",
              description: "Must be a string",
            },
            city: {
              bsonType: "string",
              description: "Must be a string",
            },
            country: {
              bsonType: "string",
              description: "Must be a string",
            },
          },
        },
      },
    },
  },
});
db.merchants.find(); // Cek, hasilnya kosong

// Insert valid document
db.merchants.insertOne({
  _id: "toko1",
  name: "Toko Satu",
  balance: new NumberLong(1000000),
  type: "PREMIUM",
  address: {
    street: "Jalan Raya Belum Jadi",
    city: "Jakarta",
    country: "Indonesia",
  },
});
db.merchants.find(); // Cek, ada hasilnya

// Inser Invalid document: Name is blank, // hasilnya error
db.merchants.insertOne({
  _id: "toko2",
  balance: new NumberLong(1000000),
  type: "PREMIUM",
  address: {
    street: "Jalan Raya Belum Jadi",
    city: "Jakarta",
    country: "Indonesia",
  },
});

// Inser Invalid document: Address City is blank, , // hasilnya error
db.merchants.insertOne({
  _id: "toko2",
  name: "Toko Dua",
  balance: new NumberLong(1000000),
  type: "PREMIUM",
  address: {
    street: "Jalan Raya Belum Jadi",
    country: "Indonesia",
  },
});

// Add validator to customers collection
db.runCommand({
  collMod: "customers",
  validationAction: "error",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["full_name"],
      properties: {
        full_name: {
          bsonType: "string",
          description: "Must be a string",
        },
      },
    },
  },
});
db.customers.find(); // cek, hasilnya tidak terjadi apa2

// Hasilnya error dong, kan salah validasinya
db.customers.insertOne({
  _id: "salah",
  name: "Salah",
});
