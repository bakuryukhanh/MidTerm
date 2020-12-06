const ProductService = require("../models/services/productServices");
const { productModel } = require("../models/productModel");
const { ObjectId } = require("mongodb");
const Constant = require("../constant");
function getsortType(index) {
    var sort = 0;
    switch (index) {
        case "0":
            sort = {};
            break;
        case "1":
            sort = { name: 1 };
            break;
        case "2":
            sort = { price: -1 };
            break;
        case "3":
            sort = { price: 1 };
            break;
    }
    return sort;
}
exports.index = async (req, res, next) => {
    sess = req.session;
    var page = +req.query.page || 1;
    var sortIndex = req.query.sort || 0;
    const products = await ProductService.listPageProduct(
        page,
        Constant.ITEM_PER_PAGE,
        getsortType(sortIndex)
    );
    res.render("pages/shop", {
        page: "shop",
        products: products.docs,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortIndex,
        currentPage: products.page,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        totalPages: products.totalPages,
    });
};
exports.cart = async (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
    console.log(sess);
    res.end("done");
};
exports.filter = async (req, res, next) => {
    sess = req.session;
    var page = +req.query.page || 1;
    var sortIndex = req.query.sort || 0;
    var filter = { type: req.params.type };
    const products = await ProductService.listPageProduct(
        page,
        Constant.ITEM_PER_PAGE,
        getsortType(sortIndex),
        filter
    );
    res.render("pages/shop", {
        page: "shop",
        products: products.docs,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortIndex,
        currentPage: products.page,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        totalPages: products.totalPages,
        filter: req.params.type,
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
