// Call of the required modules
const express = require("express");
const router = express();

// User routes
const userRoutes = require("./user.js");
router.use("/auth", userRoutes);

// Wood routes
const woodRoutes = require("./wood.js");
router.use("/all", woodRoutes);

module.exports = router;
