const { Account } = require("../models/account.model.js");
const { User } = require("../models/user.model.js");
const mongoose = require("mongoose");

const updateField = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/paytm");
    const users = await User.updateMany({}, { $unset: ["amount"] });
    console.log(users);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

// Call the updateField function
updateField();
