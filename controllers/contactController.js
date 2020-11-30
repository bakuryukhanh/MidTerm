const { FeedBackModel } = require("../models/contactModel");

exports.index = (req, res, next) => {
    sess = req.session;
    res.render("pages/contact", {
        page: "contact",
        cart: sess.Cart,
        login: sess.Login,
    });
};
exports.contact = async (req, res, next) => {
    const feedback = req.body;
    feedback.date = new Date();
    const newfeedback = new FeedBackModel(feedback);
    await newfeedback.save().catch((err) => {
        console.log(err);
        res.json({ log: "failed" });
    });
    await res.json({ log: "success" });
};
