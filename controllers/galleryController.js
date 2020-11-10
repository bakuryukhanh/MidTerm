const galleryModel = require("../models/galleryModel");

exports.index = (req, res, next) => {
    sess = req.session;
    const products = galleryModel.Products;
    res.render("gallery", {
        page: "gallery",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
    });
};
