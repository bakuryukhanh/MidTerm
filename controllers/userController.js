const { userModel } = require("../models/userModel");
const mongoose = require("../mongoose/mongoose");

exports.index = (req, res, next) => {
    sess = req.session;
    if (sess.Login) {
        res.redirect("/");
    }
    res.render("user");
};
exports.login = (req, res, next) => {
    const user = userModel;
    user.findOne(req.body, (err, user) => {
        if (err) {
            res.json({ log: "failed" });
        } else {
            if (user != null) {
                console.log(user);
                req.session.Login = user;
                sess = req.session;
                res.json({ log: "success" });
            } else {
                res.json({ log: "failed" });
            }
        }
    });
    console.log(user);
};
exports.signup = (req, res, next) => {
    console.log(req.body);
    const newUsr = new userModel(req.body);
    newUsr
        .save()
        .then(() => res.json({ log: "success" }))
        .catch((err) => {
            res.json({ log: "failed" });
        });
};
exports.signout = (req, res, next) => {
    sess = req.session;
    sess.Login = null;
    res.end("done");
};
