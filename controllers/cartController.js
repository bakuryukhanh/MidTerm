exports.index = (req, res, next) => {
    var sess = req.session;
    res.render("pages/cart", {
        page: "shop",
        login: sess.Login,
        cart: sess.Cart,
    });
};
