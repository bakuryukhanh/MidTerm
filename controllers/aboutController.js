const aboutModel = require("../models/aboutModel");
exports.index = (req, res, next) => {
    sess = req.session;
    const members = aboutModel.members;
    res.render("about", {
        page: "about",
        cart: sess.Cart,
        login: sess.Login,
        members: members,
    });
};
