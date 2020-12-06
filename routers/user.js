const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/signout", userController.signout);
router.post("/updateAva", userController.updateAva);

module.exports = router;
