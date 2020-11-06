const cartModel = require("../models/cartModel");
exports.index = (req, res, next) => {
    res.render("cart", { page: "cart" });
};
