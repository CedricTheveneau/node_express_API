// Initialization of the app with express.js
const express = require("express");
const app = express();
module.exports = app;

// Initialize the connection with the DataBase
const db = require("./app/models/index.js");
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));
