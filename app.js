// Initialization of the app with express.js
const express = require("express");
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

// DB initialization
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Add routes here
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;
