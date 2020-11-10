const shopModel = require("../models/shopModel");

exports.index = (req, res, next) => {
    sess = req.session;
    const products = shopModel.Products;

    res.render("shop", {
        page: "shop",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
    });
};
exports.cart = (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
    console.log(sess);
    res.end("done");
};
