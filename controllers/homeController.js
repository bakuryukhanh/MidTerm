const { productModel } = require("../models/productModel");

exports.index = async (req, res, next) => {
    sess = req.session;
    const products = await productModel.find({}).limit(4);
    if (sess.Login) {
        res.render("pages/home", {
            page: "home",
            cart: sess.Cart,
            login: sess.Login,
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
