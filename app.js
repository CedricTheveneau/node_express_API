// Initialization of the app with express.js
const express = require("express");
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const app = express();
const path = require("path");

// DB initialization
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Add routes here
app.use("/api", router);
module.exports = app;
