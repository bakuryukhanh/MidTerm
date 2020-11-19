const shopModel = require("../models/shopModel");
var productsModel = shopModel.productModel;
var sortType = "0";
exports.index = (req, res, next) => {
    sess = req.session;
    var test = productsModel.find({}, (err, products) => {
        res.render("shop", {
            page: "shop",
            products: products,
            cart: sess.Cart,
            login: sess.Login,
            sortType: sortType,
        });
    });
    test.then((products) => console.log(products));
};
exports.cart = (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
    console.log(sess);
    res.end("done");
};
exports.sort = (req, res, next) => {
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
    productsModel
        .find({})
        .sort(sort)
        .exec(function (err, products) {
            console.log(res);
            sess = req.session;
            res.render("shop", {
                page: "shop",
                products: products,
                cart: sess.Cart,
                login: sess.Login,
                sortType: sortType,
            });
            console.log("sort");
        });
};
exports.filter = (req, res, next) => {
    sess = req.session;
    const type = req.params.type;
    productsModel.find({ type: type }).exec(function (err, products) {
        console.log(res);
        sess = req.session;
        res.render("shop", {
            page: "shop",
            products: products,
            cart: sess.Cart,
            login: sess.Login,
            sortType: sortType,
            filter: type,
        });
        console.log("sort");
    });
};
exports.detail = (req, res, next) => {
    sess = req.session;
    const id = req.params.id;
    productsModel.find({ _id: id }).exec(function (err, products) {
        console.log(products);
        sess = req.session;
        res.render("detail", {
            page: "shop",
            cart: sess.Cart,
            login: sess.Login,
            product: products[0],
        });
    });
};
