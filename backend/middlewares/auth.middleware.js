const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/AsyncHandler.js");
const { User } = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.headers["authorization"] && !req.cookies.token) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }
  const token = req.cookies.token || req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    return res.status(401).json(new ApiError(500, "something went wrong"));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }
  req.userId = decoded.id;
  next();
});

module.exports = {
  verifyToken,
};
