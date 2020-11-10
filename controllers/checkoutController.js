const checkoutModel = require("../models/checkoutModel");

exports.index = (req, res, next) => {
    res.render("checkout", { page: "checkout", login: sess.Login });
};
