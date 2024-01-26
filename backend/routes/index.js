const router = require("express").Router();
const userRouter = require("./user.route.js");
const accountRouter = require("./account.route.js");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

router.use("/users", userRouter);
router.use("/accounts", accountRouter);

module.exports = router;
