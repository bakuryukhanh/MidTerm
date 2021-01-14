const UserServices = require("../models/services/UserServices");
const { to } = require("await-to-js");
exports.index = (req, res, next) => {
    if (!req.user) {
        return res.render("login-needed");
    }
    res.render("pages/account", { page: "account", user: req.user });
};
exports.updateInfo = async (req, res, next) => {
    if (!req.user) {
        return res.json({ err: "login needed" });
    }
    console.log(req.user);
    var [error] = await to(UserServices.updateInfo(req.user._id, req.body));
    if (error) {
        return res.json(err);
    }
    return res.json({ log: "success" });
};
exports.updatePassword = async (req, res, next) => {
    if (!req.user) {
        return res.json({ err: "login needed" });
    }
    var [err] = await to(
        UserServices.changePassword(
            req.user._id,
            req.body.oldpassword,
            req.body.newpassword
        )
    );
    if (err) {
        return res.json(err);
    }
    return res.json({ log: "success" });
};
