const { BillModel } = require("../models/billModel");
const UserServices = require("../models/services/UserServices");
const { to } = require("await-to-js");
const moment = require("moment");

exports.index = (req, res, next) => {
    var sess = req.session;
    res.render("pages/checkout", {
        page: "checkout",
        user: req.user,
        cart: sess.Cart,
    });
};
exports.checkout = async (req, res, next) => {
    console.log(req.body);
    var bill = req.body;
    var today = moment().format("DD/MM/YYYY").toString();
    bill.date = today;
    bill.status = "ordering";
    const newBill = await new BillModel(bill);
    var [err, bill] = await to(newBill.save());

    if (req.user) {
        var [err, bill] = await to(UserServices.addBill(req.user._id, bill));
    }
    if (err) {
        res.json(err);
    }
    req.session.Cart = {};
    res.json({ log: "success" });
};
