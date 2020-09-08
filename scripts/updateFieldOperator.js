/*
Update Document Function

Operator            Keterangan
$set          -> Mengubah nilai field di document
$unset        -> Menghapus field di document
$rename       -> Mengubah nama field di document
$inc          -> Menaikan nilai number di field sesuai jumlah tertentu
$currentDate  -> Mengubah field menjadi waktu saat ini
*/

// Syntax $set Operator
db.collection.update(
  {
    // query
  },
  {
    $set: {
      field1: "value",
      field2: "value",
    },
  }
);

// Syntax $unset Operator
db.collection.update(
  {
    // query
  },
  {
    $unset: {
      field1: "",
      field2: "",
    },
  }
);

// Syntax $rename Operator
db.collection.update(
  {
    // query
  },
  {
    $rename: {
      field1: "newName1",
      field2: "newName2",
    },
  }
);

// Syntax $inc Operator
db.collection.update(
  {
    // query
  },
  {
    $rename: {
      field1: 1, // increment,bisa 2, 3, 4, dst
      field2: -1, // decrement
    },
  }
);

// Syntax $currentDate Operator
db.collection.update(
  {
    // query
  },
  {
    $currentDate: {
      field1: {
        $type: "date",
      },
      field1: {
        $type: "timestamp",
      },
    },
  }
);

// CONTOH
// alter table customers change name full_name
// cek dulu di
db.customers.find();
db.customers.updateMany(
  {},
  {
    $rename: {
      name: "full_name",
    },
  }
);
// cek hasilnya
db.customers.find();

// update products set stock = stock + 10
// cek dulu di
db.products.find();
db.products.updateMany(
  {},
  {
    $inc: {
      stock: 10,
    },
  }
);
db.products.find();

// coba lagi
db.products.updateMany(
  {},
  {
    $inc: {
      stock: 10,
    },
  }
);
// cek lagi
db.products.find();

// coba lagi
db.products.updateMany(
  {},
  {
    $inc: {
      stock: -10,
    },
  }
);
// cek lagi
db.products.find();

// update products set lastModifiedDate = current_date()
db.products.updateMany(
  {},
  {
    $currentDate: {
      lastModifiedDate: {
        $type: "date",
      },
    },
  }
);
// cek lagi
db.products.find();
