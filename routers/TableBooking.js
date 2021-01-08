const express = require("express");
const router = express.Router();
const TableBookingController = require("../controllers/TableBookingController");

router.get("/", TableBookingController.index);
router.post("/", TableBookingController.submitForm);

module.exports = router;
