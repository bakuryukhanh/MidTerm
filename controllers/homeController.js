const homeModel = require("../models/homeModel");

exports.index = (req, res, next) => {
    res.render("home", { page: "home" });
};
