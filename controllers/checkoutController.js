const { BillModel } = require("../models/billModel");

exports.index = (req, res, next) => {
    var sess = req.session;
    res.render("checkout", {
        page: "checkout",
        login: sess.Login,
        cart: sess.Cart,
    });
};
exports.checkout = async (req, res, next) => {
    console.log(req.body);
    const newBill = await new BillModel(req.body);
    await newBill.save().catch((err) => console.log(err));
    await res.json({ log: "success" });
};
