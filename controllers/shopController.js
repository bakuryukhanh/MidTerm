const ProductService = require("../models/services/productServices");
const { productModel } = require("../models/productModel");
const { ObjectId } = require("mongodb");
const Constant = require("../constant");
const productServices = require("../models/services/productServices");
const UserServices = require("../models/services/UserServices");
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
    var FavList;
    if (req.user) {
        FavList = await UserServices.getFavouriteList(req.user.id);
    }
    var page = +req.query.page || 1;
    var sortIndex = req.query.sort || 0;
    var minPrice = +req.query.minPrice || 0;
    var maxPrice = +req.query.maxPrice || 100000;
    var Filter = {};
    Filter.price = { $gte: minPrice, $lte: maxPrice };
    const products = await ProductService.listPageProduct(
        page,
        Constant.ITEM_PER_PAGE,
        getsortType(sortIndex),
        Filter
    );
    console.log(FavList);
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
        favList: FavList,
    });
};
exports.cart = async (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
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
    const product = await productModel.findOne({ _id: ObjectId(id) });
    const relateproduct = await productModel.find({ type: product.type });
    console.log(relateproduct);
    res.render("pages/detail", {
        page: "shop",
        cart: sess.Cart,
        user: req.user,
        product: product,
        relatedproduct: relateproduct,
    });
};
exports.search = async (req, res, next) => {
    var keyword = req.body.keyword;
    keyword = keyword.normalize("NFC");

    var re = new RegExp(keyword, "gi");

    var filter = {};
    filter = { name: { $regex: re } };
    const results = await ProductService.listPageProduct(
        undefined,
        undefined,
        undefined,
        filter
    );
    res.json(results.docs);
};
exports.getComments = async (req, res, next) => {
    const comments = await productServices.getComments(req.params.productId);

    res.json(comments);
};
exports.postComment = async (req, res, next) => {
    if (!req.user) {
        res.json("You haven't signed in, Signing in to post comment");
        return;
    }
    var newComment = req.body;
    newComment.user = req.user;
    await productServices
        .postComment(newComment, req.params.productId)
        .catch((err) => res.json(err));
    res.json({ log: "success", comment: newComment });
};
