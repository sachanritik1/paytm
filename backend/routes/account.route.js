const { Router } = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getBalance,
  transferMoney,
} = require("../controllers/account.controller");

const router = Router();

router.use(verifyToken);
router.route("/balance").get(getBalance);
router.route("/transfer").post(transferMoney);

module.exports = router;
