const accountModel = require("../models/accountModel");

exports.index = (req, res, next) => {
    res.render("account", { page: "account", login: sess.Login });
};
