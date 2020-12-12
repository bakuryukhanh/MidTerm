const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.index);
router.post("/", shopController.cart);
router.post("/api/product/search", shopController.search);
router.get("/:id", shopController.detail);
router.get("/filter/:type", shopController.filter);
router.post("/:productId/comment", shopController.postComment);
router.get("/:productId/comment", shopController.getComments);

module.exports = router;
