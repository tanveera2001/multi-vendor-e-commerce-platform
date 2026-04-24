const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");

const sellersData = require("../seedData/seller");
const productSeeder = require("../seedData/products");

const seedDatabase = async (req, res) => {
  try {
    await Seller.deleteMany({});
    await Product.deleteMany({});

    // ✅ multiple sellers insert
    const sellers = await Seller.insertMany(sellersData);

    // ✅ create products for ALL sellers
    let allProducts = [];

    sellers.forEach((seller, index) => {
      const products = productSeeder(seller);
      allProducts = [...allProducts, ...products];
    });

    await Product.insertMany(allProducts);

    return res.json({
      message: "Seed success 🚀",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Seed failed",
      error: error.message,
    });
  }
};

module.exports = { seedDatabase };
