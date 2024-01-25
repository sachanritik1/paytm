const { ApiError } = require("../utils/ApiError");
const { JWT_SECRET } = require("../constants");
const { asyncHandler } = require("../utils/asyncHandler");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
