const { productModel } = require("../models/productModel");
const { ObjectId } = require("mongodb");
var sortType = "0";
exports.index = async (req, res, next) => {
    sess = req.session;
    var products = await productModel.find({});
    res.render("pages/shop", {
        page: "shop",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortType,
    });
};
exports.cart = async (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
    console.log(sess);
    res.end("done");
};
exports.sort = async (req, res, next) => {
    console.log(req.params);
    sess = req.session;
    const sortType = req.params.sortType;
    switch (sortType) {
        case "0":
            sort = {};
            break;
        case "1":
            sort = {};
            break;
        case "2":
            sort = { price: -1 };
            break;
        case "3":
            sort = { price: 1 };
            break;
    }
    const products = await productModel.find({}).sort(sort);
    sess = req.session;
    res.render("pages/shop", {
        page: "shop",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortType,
    });
};
exports.filter = async (req, res, next) => {
    sess = req.session;
    const type = req.params.type;
    const products = productModel.find({ type: type });
    sess = req.session;
    res.render("pages/shop", {
        page: "shop",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortType,
        filter: type,
    });
};
exports.detail = async (req, res, next) => {
    sess = req.session;
    const id = req.params.id;
    const products = await productModel.findOne({ _id: ObjectId(id) });
    res.render("pages/detail", {
        page: "shop",
        cart: sess.Cart,
        login: sess.Login,
        product: products,
    });
};
