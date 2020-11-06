const shopModel = require("../models/shopModel");

exports.index = (req, res, next) => {
    res.render("shop", { page: "shop" });
};
