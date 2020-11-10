const contactModel = require("../models/contactModel");

exports.index = (req, res, next) => {
    sess = req.session;
    res.render("contact", {
        page: "contact",
        cart: sess.Cart,
        login: sess.Login,
    });
};
