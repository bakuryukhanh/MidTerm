const mongoose = require("../mongoose/mongoose");
const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    price: Number,
    imgSrc: String,
    type: String,
    isHot: Boolean,
    isSale: Boolean,
    New: Boolean,
});
let productModel = mongoose.model("product", productsSchema);

exports.productModel = productModel;
