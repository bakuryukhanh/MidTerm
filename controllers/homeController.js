const { productModel } = require("../models/shopModel");

exports.index = async (req, res, next) => {
    sess = req.session;
    const products = await productModel.find({}).limit(4);
    if (sess.Login) {
        res.render("home", {
            page: "home",
            cart: sess.Cart,
            login: sess.Login,
            products: products,
        });
    } else {
        res.render("home", {
            page: "home",
            cart: sess.Cart,
            products: products,
        });
    }
};
