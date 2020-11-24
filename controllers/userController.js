const { userModel } = require("../models/userModel");
const mongoose = require("../mongoose/mongoose");

exports.index = (req, res, next) => {
    sess = req.session;
    if (sess.Login) {
        res.redirect("/");
    }
    res.render("user");
};
exports.login = async (req, res, next) => {
    const use = await userModel.findOne(req.body).catch((err) => {
        console.err(err);
    });
    if (user != null) {
        console.log(user);
        req.session.Login = user;
        sess = req.session;
        res.json({ log: "success" });
    } else {
        res.json({ log: "failed" });
    }
};
exports.signup = async (req, res, next) => {
    console.log(req.body);
    const newUsr = new userModel(req.body);

    await newUsr.save().then(() => res.json({ log: "success" })).catch;
    res.json({ log: "success" });
};
exports.signout = (req, res, next) => {
    sess = req.session;
    sess.Login = null;
    res.end("done");
};
