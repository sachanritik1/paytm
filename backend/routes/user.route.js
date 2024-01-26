const { Router } = require("express");
const {
  signup,
  signin,
  signout,
  getBulkUsers,
  getRecentUsers,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
//protected route
router.use(verifyToken);
router.route("/signout").get(signout);
router.route("/bulk").get(getBulkUsers);
router.route("/recent").get(getRecentUsers);

module.exports = router;
