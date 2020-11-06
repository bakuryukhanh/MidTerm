const aboutModel = require("../models/aboutModel");
exports.index = (req, res, next) => {
    res.render("about", { page: "about" });
};
