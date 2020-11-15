const shopModel = require("../models/shopModel");
var products = shopModel.Products;
var sortType = "0";
exports.index = (req, res, next) => {
    sess = req.session;
    console.log(sortType, typeof sortType);

    res.render("shop", {
        page: "shop",
        products: products,
        cart: sess.Cart,
        login: sess.Login,
        sortType: sortType,
    });
};
exports.cart = (req, res, next) => {
    req.session.Cart = req.body;
    sess = req.session;
    console.log(sess);
    res.end("done");
};
exports.sort = (req, res) => {
    console.log(req.body);
    sortType = req.body.sort;
    switch (req.body.sort) {
        case "0": {
            products = products.sort(idAscending);
            break;
        }
        case "2": {
            products = products.sort(priceDescending);
            break;
        }
        case "3": {
            products = products.sort(priceAscending);
            break;
        }
    }
    console.log(shopModel.Products);
    res.redirect("/");
};
function priceDescending(a, b) {
    if (a.price < b.price) return 1;
    if (b.price < a.price) return -1;

    return 0;
}
function priceAscending(a, b) {
    if (a.price > b.price) return 1;
    if (b.price > a.price) return -1;

    return 0;
}

function idAscending(a, b) {
    if (a.id > b.id) return 1;
    if (b.id > a.id) return -1;

    return 0;
}
