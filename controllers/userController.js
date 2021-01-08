const { uploadImg } = require("../models/services/UploadImageService");
const UserServices = require("../models/services/UserServices");
const formidable = require("formidable");
const { to } = require("await-to-js");
var bcrypt = require("bcryptjs");

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
            const [err, url] = await to(uploadImg(files.image.path));
            if (err) {
                return res.json(err);
            }
            fields.imgSrc = url;
        } else {
            fields.imgSrc =
                "https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg";
        }
        user = fields;
        var [error, hash] = await to(bcrypt.hash(user.password, 10));
        user.password = hash;
        var [error] = await to(UserServices.addUser(user));
        if (error) {
            return res.json(error);
        }
        res.json({ log: "success" });
    });
};
exports.updateAva = async (req, res, next) => {
    const form = formidable({ multiples: true });
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.json(err);
        }
        if (files.image && files.image.size > 0) {
            var [error, url] = await to(uploadImg(files.image.path));
            fields.imgSrc = url;
        }
        var [error] = await to(
            UserServices.updateAva(req.user._id, fields.imgSrc)
        );
        if (error) {
            return res.json(error);
        }
        req.user.imgSrc = fields.imgSrc;
        res.json({ log: "success" });
    });
};
exports.signout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};
exports.getFavList = async (req, res, next) => {
    if (!req.user) {
        res.json("You need to sign in");
        return;
    }
    const [err, favList] = await to(
        UserServices.getFavouriteList(req.user._id)
    );
    if (err) {
        res.status(401);
        return res.json(err);
    }
    return res.json(favList);
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
        return res.render("login-needed");
    }
    const [err, History] = await to(UserServices.getBills(req.user._id));
    if (err) {
        return res.send(err);
    }
    //render History
    res.render("pages/history", {
        user: req.user,
        bills: History,
    });
};
exports.getHistoryDetail = async (req, res, next) => {
    if (!req.user) {
        return res.render("login-needed");
    }
    const billId = req.params.id;
    var [err, bill] = await to(UserServices.getBillById(req.user._id, billId));
    if (err) {
        return res.send(err);
    }
    res.render("pages/historyDetail", {
        bill: bill,
        user: req.user,
    });
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
