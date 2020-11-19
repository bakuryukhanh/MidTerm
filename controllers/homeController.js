const shopModel = require("../models/shopModel");

exports.index = (req, res, next) => {
    const productModel = shopModel.productModel;
    sess = req.session;
    productModel
        .find({})
        .limit(4)
        .exec((err, products) => {
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
        });
};
