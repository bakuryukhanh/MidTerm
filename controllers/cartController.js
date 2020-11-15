const cartModel = require("../models/cartModel");
exports.index = (req, res, next) => {
    var sess = req.session;
    res.render("cart", { page: "shop", login: sess.Login, cart: sess.Cart });
};
