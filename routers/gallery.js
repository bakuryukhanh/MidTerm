const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.index);

module.exports = router;
