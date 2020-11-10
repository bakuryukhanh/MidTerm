const homeModel = require("../models/homeModel");

exports.index = (req, res, next) => {
    sess = req.session;
    if (sess.Login) {
        res.render("home", {
            page: "home",
            cart: sess.Cart,
            login: sess.Login,
        });
    }
    res.render("home", { page: "home", cart: sess.Cart });
};
