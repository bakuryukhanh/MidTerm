const aboutModel = require("../models/aboutModel");
exports.index = (req, res, next) => {
    sess = req.session;
    const members = aboutModel.members;
    res.render("pages/about", {
        page: "about",
        cart: sess.Cart,
        user: req.user,
        members: members,
    });
};
