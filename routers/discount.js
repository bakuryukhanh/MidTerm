const DiscountController = require("../controllers/discountController");
const express = require("express");
const router = express.Router();
router.post("/check", DiscountController.check);
module.exports = router;
