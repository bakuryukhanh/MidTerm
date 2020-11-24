const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.get("/", checkoutController.index);
router.post("/", checkoutController.checkout);
module.exports = router;
