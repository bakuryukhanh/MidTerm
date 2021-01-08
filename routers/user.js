const express = require("express");
const router = express.Router();
const { loginAuthenrize } = require("../authorized/passportjs");
const userController = require("../controllers/userController");

router.get("/", userController.index);

router.post("/login", loginAuthenrize, userController.login);
router.post("/signup", userController.signup);
router.get("/signout", userController.signout);
router.post("/updateAva", userController.updateAva);
router.get("/fav-list", userController.getFavList);
router.post("/fav-list", userController.add2FavList);
router.get("/history", userController.getHistory);
router.get("/history/:id", userController.getHistoryDetail);
router.post("/history", userController.add2History);

module.exports = router;
