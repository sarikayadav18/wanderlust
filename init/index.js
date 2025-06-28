// /init/index.js

const mongoose = require("mongoose");
const initData = require("./data"); // ✅ correct

const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("🧹 Old listings deleted");

    console.log("📦 Inserting new listings...");
    await Listing.insertMany(initData.data);

    console.log("✅ Sample listings inserted successfully");
  } catch (err) {
    console.error("❌ Error initializing data:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  }
};

initDB();
