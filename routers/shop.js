const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.index);
router.post("/", shopController.cart);
router.post("/sort", shopController.sort);

module.exports = router;
