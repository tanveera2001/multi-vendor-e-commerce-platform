require("dotenv").config();
const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URL);

    console.log("Database connected successfully...");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};
