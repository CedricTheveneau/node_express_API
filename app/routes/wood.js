const express = require("express");
const router = express();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer.js");

router.get("/", auth, woodCtrl.list);
router.get("/:hardness", auth, woodCtrl.readByHardness);

router.post("/", auth, multer, woodCtrl.create);

router.put("/", auth, multer, woodCtrl.update);

module.exports = router;
