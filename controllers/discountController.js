const { DiscountModel } = require("../models/discountModel");
exports.check = async (req, res, next) => {
    console.log(req.body);
    const discount = await DiscountModel.findOne({ code: req.body.code });
    console.log(discount);
    if (discount == null || discount == undefined) {
        res.json({ log: "failed" });
    }
    res.json(discount);
};
