const { productModel } = require("../models/productModel");

exports.index = async (req, res, next) => {
    var user = req.user;
    sess = req.session;
    const products = await productModel.find({}).limit(4);
    if (user) {
        res.render("pages/home", {
            page: "home",
            cart: sess.Cart,
            user: user,
            products: products,
        });
    } else {
        res.render("pages/home", {
            page: "home",
            cart: sess.Cart,
            products: products,
        });
    }
};
