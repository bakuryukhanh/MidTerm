const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.index);
router.post("/", shopController.cart);
router.get("/:id", shopController.detail);
router.get("/sort/:sortType", shopController.sort);
router.get("/filter/:type", shopController.filter);
router.get("/filter/:type/:start/:end", shopController.filter);

module.exports = router;
