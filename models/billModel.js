const mongoose = require("../mongoose/mongoose");
const billSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    customerEmail: String,
    productList: Array,
    discountCode: String,
    shipping: Number,
    date: String,
    total: Number,
    state: String,
});

let billModel = mongoose.model("bills", billSchema);

exports.BillModel = billModel;
