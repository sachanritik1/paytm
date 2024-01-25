const { z } = require("zod");
const { User } = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { JWT_SECRET } = require("../constants");
const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6),
});

const signup = asyncHandler(async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json(new ApiError(400, "invalid args", result.error));
  }
  const { username, firstName, lastName, email, password } = result.data;

  let user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  user = await User.findById(user.id).select("-password");

  if (!user) {
    return res.status(500).json(new ApiError(500, "Something went wrong"));
  }

  await Account.create({
    userId: user.id,
    balance: Math.floor(1 + Math.random() * 10000),
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.send(new ApiResponse(200, "User registered successfully", { token }));
});

const signinSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

const signin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const body = signinSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json(new ApiError(400, "invalid args", body.error));
  }
  const { username, password } = body.data;
  const user = await User.findOne({
    $and: [{ username }, { password }],
  }).select("-password");
  if (!user) {
    return res
      .status(400)
      .json(new ApiError(400, "User not found or incorrect password"));
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.send(new ApiResponse(200, "Signed in successfully", { token, user }));
});

const signout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.send(new ApiResponse(200, "Signed out successfully"));
});

const getBulkUsers = asyncHandler(async (req, res) => {
  const { filter } = req.query;
  console.log(filter);
  const users = await User.find({
    $or: [
      { username: { $regex: filter, $options: "i" } },
      { email: { $regex: filter, $options: "i" } },
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  }).select("-password -username -email");
  res.send(new ApiResponse(200, "Success", { users }));
});

const getRecentUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password ").limit(5);
  if (!users) {
    return res.status(500).json(new ApiError(500, "Something went wrong"));
  }
  res.send(new ApiResponse(200, "Success", { users }));
});

module.exports = {
  signup,
  signin,
  signout,
  getBulkUsers,
  getRecentUsers,
};
