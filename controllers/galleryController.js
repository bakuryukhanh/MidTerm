const shopModel = require("../models/shopModel");
var productsModel = shopModel.productModel;

exports.index = (req, res, next) => {
    sess = req.session;
    productsModel.find({}, (err, products) => {
        res.render("gallery", {
            page: "gallery",
            products: products,
            cart: sess.Cart,
            login: sess.Login,
        });
    });
};
