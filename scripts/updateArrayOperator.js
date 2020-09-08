/*
Array Update Operator

Operator            Keterangan
$                 -> Mengupdate data arrau pertama sesuai kondisi query
$[]               -> Mengupdate semua data array sesuai kondisi query
$[<identifier>]   -> Mengupdate semua data array yang sesuai kondisi arrayFilters
<index>           -> Mengupdate data array sesuai dengan nomor index

$addToSet         -> Menambahkan value ke array, dihiraukan jika sudah ada
$pop              -> Menghapus element pertama (-1) atau terakhir (1) array
$pull             -> Menghapus semua element di array yg sesuai kondisi
$push             -> Menambahkan element ke array
$pullALl          -> Menghapus semua element di array
*/

// Syntax $ Operator
db.collection.updateMany(
  {
    // query
  },
  {
    $operator: {
      "field.$": "value",
    },
  }
);

// Syntax $[] Operator
db.collection.updateMany(
  {
    // query
  },
  {
    $operator: {
      "field.$[]": "value",
    },
  }
);

// Syntax $[<identifier>] Operator
db.collection.updateMany(
  {
    // query
  },
  {
    $operator: {
      "field.$[element]": "value",
    },
  },
  {
    arrayFilters: [
      {
        element: {
          $operator: "value",
        },
      },
    ],
  }
);

// Syntax $[] Operator
db.collection.updateMany(
  {
    // query
  },
  {
    $operator: {
      "field.<index>": "value",
    },
  }
);

// CONTOH
// Seblumnya tambahin data dulu
// update products set rating = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update first element of array, query must include array fields
db.products.updateMany(
  {
    ratings: 90,
  },
  {
    $set: {
      "ratings.$": 100,
    },
  }
);

// update all element of array
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[]": 100, // dibikin semuanya jadi 100
    },
  }
);

// update products set rating = [90, 80, 70]
// disini reset ulang dulu
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update element of array base on arrayFilters
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[element]": 100,
    },
  },
  {
    arrayFilters: [
      {
        element: {
          $gte: 80,
        },
      },
    ],
  }
);

// update element of array with given index
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.0": 50,
      "ratings.1": 60,
    },
  }
);

// add "popularity" to aray if not exists
db.products.updateOne(
  {
    _id: 8,
  },
  {
    $addToSet: {
      tags: "popular",
    },
  }
);

// remove first element of array
db.products.updateMany(
  {},
  {
    $pop: {
      ratings: -1,
    },
  }
);

// kembalikan ke awal lagi
// update products set rating = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// add 100 to ratings
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 100,
    },
  }
);

// remove element 100
db.products.updateMany(
  {},
  {
    $pullAll: {
      ratings: [100],
    },
  }
);

// add 100, 200, 300, to ratings
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300],
      },
    },
  }
);

// add trending, popular to tags
db.products.updateMany(
  {},
  {
    $addToSet: {
      tags: {
        $each: ["trending", "popular"],
      },
    },
  }
);

// add hot in position 1
db.products.updateMany(
  {},
  {
    $push: {
      tags: {
        $each: ["hot"],
        $position: 1,
      },
    },
  }
);

// add all element, but limit with slice
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $slice: -5,
      },
    },
  }
);

// add all element, and sort desc
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500],
        $sort: -1,
      },
    },
  }
);
