const express = require("express");
const router = express();
const woodCtrl = require("../controllers/wood.js");

router.get("/", woodCtrl.list);
router.get("/:hardness", woodCtrl.readByHardness);

module.exports = router;
