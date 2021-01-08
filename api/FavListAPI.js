const express = require("express");
const router = express.Router();
const UserServices = require("../models/services/UserServices");
router.get("/", async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.end("done");
    }
    const favList = await UserServices.getFavouriteList(req.user.id);
    return res.json(favList);
});
router.post("/", async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.json({ msg: "Access denied" });
        return;
    }
    await UserServices.add2FavouriteList(req.user.id, req.body.id);
    res.status(200);
    res.end("done");
});
router.delete("/:id", async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.json({ msg: "Access denied" });
        return;
    }
    await UserServices.removeFavList(req.user.id, req.params.id);
    res.status(200);
    res.end("done");
});
module.exports = router;
