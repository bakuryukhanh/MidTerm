const shopModel = require("../models/productModel");
var { productModel } = shopModel;

exports.index = async (req, res, next) => {
    sess = req.session;
    const products = await productModel
        .find({})
        .catch((err) => console.error(err));
    await res.render("pages/gallery", {
        page: "gallery",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
    });
};
