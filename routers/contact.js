const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.index);
router.post("/", contactController.contact);

module.exports = router;
