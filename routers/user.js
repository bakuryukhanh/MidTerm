const express = require("express");
const router = express.Router();
const { loginAuthenrize } = require("../authorized/passportjs");
const userController = require("../controllers/userController");

router.get("/", userController.index);

router.post("/login", loginAuthenrize, userController.login);
router.post("/signup", userController.signup);
router.get("/signout", userController.signout);
router.post("/updateAva", userController.updateAva);

module.exports = router;
