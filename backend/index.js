const express = require("express");
const app = express();
const connectToDb = require("./db");
const mainRouter = require("./routes");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectToDb();
  console.log("Server is running on port " + port + "...");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

module.exports = app;
