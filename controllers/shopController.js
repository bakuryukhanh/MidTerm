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
    var minPrice = +req.query.minPrice || 0;
    var maxPrice = +req.query.maxPrice || 100000;
    var Filter = {};
    console.log(req.query.keyword);
    var re = new RegExp("." + req.query.keyword, "i");
    req.query.keyword ? (Filter.name = { $regex: re }) : 0;
    Filter.price = { $gte: minPrice, $lte: maxPrice };
    const products = await ProductService.listPageProduct(
        page,
        Constant.ITEM_PER_PAGE,
        getsortType(sortIndex),
        Filter
    );
    res.render("pages/shop", {
        page: "shop",
        products: products.docs,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortIndex,
        minPrice: minPrice,
        maxPrice: maxPrice,
        currentPage: products.page,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        totalPages: products.totalPages,
        totalProducts: products.totalDocs,
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
    var minPrice = req.query.minPrice || 0;
    var maxPrice = req.query.maxPrice || 100000;
    var filter = { type: req.params.type };
    var re = new RegExp("." + req.query.keyword, "i");
    req.query.keyword ? (filter.name = { $regex: re }) : 0;
    filter.price = { $gte: minPrice, $lte: maxPrice };
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
        minPrice: minPrice,
        maxPrice: maxPrice,
        totalProducts: products.totalDocs,
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
