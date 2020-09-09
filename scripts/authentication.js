/*
Authentication
- Authentication adalah proses memverifikasi identitas pengguna ketika mengakses MongoDB
- Saat menggunakan authentication, maka clien wajib menggunakan username dan password untuk terkoneksi ke MongoDB server
- MongoDB mendukung banyak mekanisme authentication, seperti:
  ~ SCRAM: https://tools.ietf.org/html/rfc5802
  ~ Certificate Authentication
  ~ LDAP
  ~ Kerberos, dan lain-lain


User
- Di MongoDB, kita bisa menambahkan user, dan jugamenambahkan role ke user tersebut
- Saat membuat user, maka harus menentukan database sebagai authentication database
- Namun bukan berarti user hanya bisa mengakses database itu saja, tapi bisa yg lain juga
- Nama user harus unik per database, namun jika databasenya berbeda, nama bisa sama

User Function
Function                    Keterangan
db.createUser()         -> Membuat user
db.getUser()            -> Mendapatkan semua user
db.dropUser()           -> Menghapus user
db.updateUser()         -> Mengupdate user
db.changeUserPassword() -> Mengubah user password
*/



// Use test database as authentication database
// use test;

// Create user with access read only
db.createUser(
  {
    user: "contoh",
    pwd: "contoh",
    roles: [
      {
        role: "read",
        db: "test"
      }
    ]
  }
)

// connect using
// mongo --username contoh --password contoh --authenticationDatabase test

// Create user with access read
db.createUser(
  {
    user: "contoh2",
    pwd: "contoh",
    roles: [
      {
        role: "readWrite",
        db: "test"
      }
    ]
  }
)

// connect using
// mongo --username contoh2 --password contoh2 --authenticationDatabase test

// Get all users
db.getUsers()

// Change password for user contoh
db.changeUserPassword("contoh", "rahasia")

// Drop user contoh
db.dropUser("contoh")

// Update user
db.updateUser("contoh2",
  {
    roles: [
      {
        role: "readWrite",
        db: "test"
      }
    ]
  }
);