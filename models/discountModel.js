const mongoose = require("../mongoose/mongoose");
const discountSchema = new mongoose.Schema({
    name: String,
    code: {
        type: String,
        require: true,
        unique: true,
    },
    value: Number,
    startDate: String,
    endDate: String,
});

let discountModel = mongoose.model("discounts", discountSchema);

exports.DiscountModel = discountModel;
