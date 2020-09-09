/*
Autherization
- Authorization adalah proses yg dilakukan setelah proses Authentication sukses
- Authorization dilakukan untuk melakukan pengecekan apakah user memiliki hak akses untuk melakukan action
- Hak akses di MongoDB disimpan dalam bentuk role

Database Roles
Role            Keterangan
read        -> Bisa membaca data di semua collection yg bukan sistem collection
readWrite   -> Bisa membaca dan mengubah data di semua collection yg bukan sistem collection
dbAdmin     -> Bisa melakukan kemampuan administrasi database
userAdmin   -> Mampu membuat user dan role
dbOwner     -> Kombinasi readWrite, dbAdmin, dan userAdmin

All Database Roles
Role                      Keterangan
readAnyDatabase       -> Seperti read role, tapi untuk semua database
readWriteAnyDatabase  -> Seperti readWrite role, tapi untuk semua database
userAdminAnyDatabase  -> Seperti userAdmin, tapi untuk semua database
dbAdminAnyDatabase    -> Seperti dbAdmin, tapi untuk semua database

Backup & Restore Roles
Role        Keterangan
backup  -> Kemampuan untuk melakukan backup database
restore -> Kemampuan untuk melakukan restore database

Superuser Roles
Role      Keterangan
root  -> Bisa melakukan apapun

Privileges
- Role membatasi hak akses di level database
- Kadang kita ingin membatasi di level collection
- Untuk melakukan ini, kita bisa menggunakan privileges

Role Function
Role                Keterangan
db.createRole() -> Membuat role baru
db.getRole()    -> Mendapatkan role
db.deleteRole() -> Menghapus role
db.updateRole() -> Mengubah role
*/

// Use test database
// use test;

// create role
db.createRole(
  {
    role: "find_and_insert",
    privileges: [],
    roles: [
      {
        role: "read",
        db: "test"
      }
    ]
  }
)

// Get all roles
db.getRoles({ showPrivileges: true });

// Update role
db.updateRole("find_and_insert",
  {
    privileges: [
      {
        resource: {
          db: "test",
          collection: "products"
        },
        actions: ["insert"]
      }
    ],
    roles: [
      {
        role: "read",
        db: "test",
      }
    ]
  }
)

// Add use with role
db.createUser(
  {
    user: "eko",
    pwd: "eko",
    roles: ["find_and_insert"]
  }
)

// Connet to mongo server
// mongo --username eko --password eko --authenticationDatabase test

// Insert product [SUCCESS]
db.products.insert(
  {
    "_id": 10,
    "name": "Ipad Pro 11 2020",
    "price": NumberLong(20000000),
    "category": "tablet",
    "tags": [
      "apple",
      "ipad",
      "tablet",
    ],
    "lastModifiedDate": new Date(),
    "stock": 10,
    "ratings": [
      100
    ]
  }
);

// Delete product [FAILED]
db.products.deleteOne(
  {
    _id: 10
  }
);

// Update product [FAILED]
db.products.updateOne(
  {
    _id: 10
  },
  {
    $set: {
      category: "food"
    }
  }
);

// Insert Customer [FAILED]
db.customers.inserOne(
  {
    _id: "kurniawan",
    name: "Eko Kurniawan Khannedy"
  }
)