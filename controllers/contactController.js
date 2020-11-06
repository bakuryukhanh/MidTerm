const contactModel = require("../models/contactModel");

exports.index = (req, res, next) => {
    res.render("contact", { page: "contact" });
};
