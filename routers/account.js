const express = require("express");
const { authUser } = require("../authorized/userAuthorized");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/", authUser, accountController.index);

module.exports = router;
