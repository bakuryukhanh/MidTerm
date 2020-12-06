const mongoose = require("../mongoose/mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imgSrc: String,
    type: String,
    more: String,
    formular: String,
    description: String,
});
productsSchema.plugin(mongoosePaginate);
let productModel = mongoose.model("product", productsSchema);

exports.productModel = productModel;
