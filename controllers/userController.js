const { userModel } = require("../models/userModel");
const { uploadImg } = require("../models/services/UploadImageService");
const UserServices = require("../models/services/UserServices");
const formidable = require("formidable");

exports.index = (req, res, next) => {
    if (req.user) {
        res.redirect("/");
    }
    res.render("pages/login-signup");
};
exports.login = (req, res, next) => {
    res.json({ log: "success" });
};
exports.signup = async (req, res, next) => {
    const form = formidable({ multiples: true });
    var user;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        if (files.image && files.image.size > 0) {
            await uploadImg(files.image.path).then(
                (url) => (fields.imgSrc = url)
            );
        } else {
            fields.imgSrc =
                "https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg";
        }
        user = fields;
        await UserServices.addUser(user);
        res.json({ log: "success" });
    });
};
exports.updateAva = async (req, res, next) => {
    const form = formidable({ multiples: true });
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        if (files.image && files.image.size > 0) {
            await uploadImg(files.image.path).then(
                (url) => (fields.imgSrc = url)
            );
        }
        await UserServices.updateAva(req.user._id, fields.imgSrc);
        console.log(req.user.imgSrc);
        req.user.imgSrc = fields.imgSrc;
        console.log(req.user.imgSrc);
        res.json({ log: "success" });
    });
};
exports.signout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};
exports.getFavList = async (req, res, next) => {
    if (!req.user) {
        res.send("You need to sign in");
        return;
    }
    const favList = await UserServices.getFavouriteList(req.user._id);
    //render favList
    res.json(favList);
};
exports.add2FavList = async (req, res, next) => {
    if (!req.user) {
        res.send("You need to sign in");
        return;
    }
    var productId = req.body.id;
    await UserServices.add2FavouriteList(req.user._id, productId);
    res.end("done");
};
exports.getHistory = async (req, res, next) => {
    if (!req.user) {
        res.send("You need to sign in");
        return;
    }
    const History = await UserServices.getBills(req.user._id);
    //render History
    res.json(History);
};
exports.add2History = async (req, res, next) => {
    if (!req.user) {
        res.send("You need to sign in");
        return;
    }
    var BillId = req.body.id;
    await UserServices.addBill(req.user._id, BillId);
    res.end("done");
};
