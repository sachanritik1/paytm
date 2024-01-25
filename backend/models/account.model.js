const { default: mongoose, Schema, model } = require("mongoose");

const accountSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = model("Account", accountSchema);

module.exports = { Account };
