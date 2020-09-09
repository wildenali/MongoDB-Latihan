/*
Security
- Secara default, jika kita menjalankan MongoDB, mode yg dijalankan tidaklah aman
- Tidak ada Authentication dan tidak ada Authorization
- Agar aman, kita harus mengaktifkan fitur access control di MongoDB

User Admin
- User admin harus ada terlebih dahulu sebelum kita mengaktifkan access control
- User admin adalah user yg memiliki role userAdminAnyDatabase dan readWriteAnyDatabase
- Setelah membuat user admin, kita baru bisa menjalankan ulang MongoDB dengan perintah --auth
*/

// use admin database
// use admin

db.createUser(
  {
    user: "mongo",
    pwd: "mongo",
    roles: [
      "userAdminAnyDatabase",
      "readWriteAnyDatabase"
    ]
  }
)

// Connect to mongodb with username & password
// mongo --username mongo --password mongo
// mongo --username mongo --password mongo --host localhost 