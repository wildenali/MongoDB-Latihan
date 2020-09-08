/*
- Query Modifier adalah memodifikasi hasil query yg telah kita lakukan 
- Contoh yg sering dilakukan, mengubah query menjadi jumlah data, membatasi jumlah data dengan paging, dll
- Untuk memodifikasil hasil query, bisa menambahkan function query modifier setelah menggunakan function find

Query Modifier Function
Operator        Keterangan
count()     -> Mengambil jumlah data hasil query
limit(size) -> Membatasi julah data yg didapat dari query
skip(size)  -> Menghiraukan data pertama hasil query sejumlah yg ditentukan
sort(query) -> Mengurutkan hasil data query
*/

// select count(*) from products
db.products.find({}).count();

// select * from products limit 4
db.products.find({}).limit(4);

// select * from products offset 2
db.products.find({}).skip(2);

// select * from products limit 4 offset 2
db.products.find({}).limit(4).skip(2);

// select * from products order by name asc, category desc
db.products.find({}).sort({
  name: 1,
  category: -1,
});
