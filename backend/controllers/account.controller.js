const { asyncHandler } = require("../utils/asyncHandler");
const { Account } = require("../models/account.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { model, default: mongoose } = require("mongoose");
const { z } = require("zod");
const { ApiError } = require("../utils/ApiError");
const { Transaction } = require("../models/transaction.model");

const getBalance = asyncHandler(async (req, res, next) => {
  const account = await Account.findOne({ userId: req.userId });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Success", { balance: account.balance }));
});

async function transfer(userId, to, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const account = await Account.findOne({ userId });
  if (!account) {
    return res.status(404).json(new ApiError(404, "Account not found"));
  }
  if (account.balance < amount) {
    return res.status(400).json(new ApiError(400, "Insufficient balance"));
  }
  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    return res
      .status(404)
      .json(new ApiError(404, "Receiver's Account not found"));
  }

  account.balance -= amount;
  toAccount.balance += amount;
  await account.save();
  await toAccount.save();
  await session.commitTransaction();
  await Transaction.create({
    sender: userId,
    receiver: to,
    amount,
  });
  session.endSession();
}

const transferSchema = z.object({
  to: z.string().min(1),
  amount: z.number().min(1),
});

const transferMoney = asyncHandler(async (req, res, next) => {
  const body = transferSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json(new ApiError(400, "invalid args", body.error));
  }
  const { to, amount } = body.data;
  await transfer(req.userId, to, amount);
  return res.status(200).json(new ApiResponse(200, "Success"));
});

module.exports = {
  getBalance,
  transferMoney,
};
