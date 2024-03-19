// Call of the required modules
const express = require("express");
const router = express();
const userRoutes = require("./user.js");
const woodRoutes = require("./wood.js");

// User routes

router.use("/auth", userRoutes);

// Wood routes
router.use("/woods", woodRoutes);

module.exports = router;
