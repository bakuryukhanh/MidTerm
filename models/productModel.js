const mongoose = require("../mongoose/mongoose");
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imgSrc: String,
    type: String,
    more: String,
    formular: String,
    description: String,
});
let productModel = mongoose.model("product", productsSchema);

exports.productModel = productModel;
