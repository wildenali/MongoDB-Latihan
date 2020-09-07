// select * from products where category in ('laptop', 'smartphone')
db.products.find({
  $and: [
    {
      category: {
        $in: ["laptop", "smartphone"],
      },
    },
    {
      price: {
        $gt: 2000000,
      },
    },
  ],
});

// select * from products where category not in ('laptop', 'smartphone')
db.products.find({
  category: {
    $not: {
      $in: ["laptop", "smartphone"],
    },
  },
});

// select * from products where price between 10000000 and 22000000 and cetegory != 'food'
db.products.find({
  $and: [
    {
      price: {
        $gte: 10000000,
        $lte: 22000000,
      },
    },
    {
      category: {
        $ne: "food",
      },
    },
  ],
});
