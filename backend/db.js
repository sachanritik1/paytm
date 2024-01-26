const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;
