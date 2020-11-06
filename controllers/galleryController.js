const galleryModel = require("../models/galleryModel");

exports.index = (req, res, next) => {
    console.log("test");
    res.render("gallery", { page: "gallery" });
};
