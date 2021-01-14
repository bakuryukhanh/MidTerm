const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/", accountController.index);
router.put("/info", accountController.updateInfo);
router.put("/password", accountController.updatePassword);

module.exports = router;
