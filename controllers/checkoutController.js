const { BillModel } = require("../models/billModel");

exports.index = (req, res, next) => {
    var sess = req.session;
    res.render("pages/checkout", {
        page: "checkout",
        login: sess.Login,
        cart: sess.Cart,
    });
};
exports.checkout = async (req, res, next) => {
    console.log(req.body);
    var bill = req.body;
    const newBill = await new BillModel(bill);
    await newBill.save().catch((err) => console.log(err));
    await res.json({ log: "success" });
};
