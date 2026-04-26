const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");

const sellersData = require("../seedData/seller");
const productSeeder = require("../seedData/products");

const seedDatabase = async (req, res) => {
  try {
    console.log("🧹 Clearing old data...");

    await Seller.deleteMany({});
    await Product.deleteMany({});

    console.log("👥 Inserting sellers...");

    // insert sellers
    const sellers = await Seller.insertMany(sellersData);

    console.log(`✅ Sellers inserted: ${sellers.length}`);

    // build products
    let allProducts = [];

    sellers.forEach((seller) => {
      const products = productSeeder(seller);
      allProducts.push(...products);
    });

    console.log(`📦 Total products to insert: ${allProducts.length}`);

    // 👇 LOG CLEAN PRODUCT PREVIEW
    console.log(
      "📦 Products Preview:",
      allProducts.map((p) => ({
        name: p.name,
        price: p.price,
        category: p.category,
        shopName: p.shopName,
      })),
    );

    // insert products
    const insertedProducts = await Product.insertMany(allProducts, {
      ordered: false,
    });

    console.log(`✅ Products inserted: ${insertedProducts.length}`);

    return res.json({
      message: "Seed success 🚀",
      sellers: sellers.length,
      products: insertedProducts.length,

      // 👇 IMPORTANT: send full data to Postman
      data: insertedProducts,
    });
  } catch (error) {
    console.error("❌ Seed error:", error);

    return res.status(500).json({
      message: "Seed failed",
      error: error.message,
    });
  }
};

module.exports = { seedDatabase };
