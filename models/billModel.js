const mongoose = require("../mongoose/mongoose");
const billSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    customerEmail: String,
    productList: Array,
    discountCode: String,
    shipping: Number,
    Total: Number,
    state: String,
});

let billModel = mongoose.model("bills", billSchema);

exports.BillModel = billModel;
