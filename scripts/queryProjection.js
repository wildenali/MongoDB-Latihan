/*
- Pada function find, terdapat parameter kedua setelah query, yaitu projection
- db.<collection>.(query, projection)
- Projection adalah memilih field mana yg ingin kita ambil atau hide

Projection Operator
$           -> Limit array hanya mengembalikan data pertama yg match dengan array operator
$elemMatch  -> Limit array hanya mengembalikan data pertama yg match dengan kondisi query
$meta       -> Mengembalikan informasi metadata yg terdapat dari setiap matching document
$slice      -> Mengontrol jumlah data yg ditampilkan pada array
*/

// Syntax Projection
db.collection.find(
  {
    // query
  },
  {
    field1: 1, // include
    field2: 0, // hide
  }
);

// Syntax $ Operator
db.products.find(
  {
    field: {
      $elemMatch: {
        // query
      },
    },
  },
  {
    "field.$": 1, // Menampilkan array field cuma 1 data aja
  }
);

// Syntax $elemMatch Operator
db.collection.find({
  field: {
    $elemMatch: {
      // query
    },
  },
});

// Syntax $meta Operator
db.collection.find(
  {
    $text: {
      $search: "query",
    },
  },
  {
    score: {
      $meta: "textScore",
    },
  }
);

// Syntax $slice Projection
db.collection.find(
  {
    // query
  },
  {
    field1: {
      $slice: 2, // slice size
    },
  }
);

// CONTOH
// select _id, name, category from products
db.products.find(
  {},
  {
    name: 1,
    category: 1,
  }
);

// select _id, name, category, price from products
db.products.find(
  {},
  {
    tags: 0,
  }
);
db.products.find(
  {},
  {
    name: 1,
    category: 1,
    price: 1,
  }
);

// select _id, name, category, price tags[first] from products where tags in ("samsung", "logitech")
db.products.find(
  {
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  },
  {
    name: 1,
    category: 1,
    price: 1,
    "tags.$": 1,
  }
);

// select _id, name, category, price, tags(in ("samsung", "logitech")) from products
db.products.find(
  {},
  {
    name: 1,
    category: 1,
    price: 1,
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  }
);

// select *, score from products where $search like "monitor"
db.products.find(
  {
    $text: {
      $search: "monitor",
    },
  },
  {
    score: {
      $meta: "textScore",
    },
  }
);

// select _id, name, price, category, tags[0,2] from products
db.products.find(
  {},
  {
    tags: {
      $slice: 2,
    },
  }
);

// select _id, name, price, category, tags[last 2] from products
db.products.find(
  {},
  {
    tags: {
      $slice: -2,
    },
  }
);

// select _id, name, price, category, tags[from, limit] from products
db.products.find(
  {},
  {
    tags: {
      $slice: [1, 1],
    },
  }
);
db.products.find(
  {},
  {
    tags: {
      $slice: [1, 2],
    },
  }
);
