const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/paytm");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;
