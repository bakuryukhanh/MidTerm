const mongoose = require("../../mongoose/mongoose");
const { productModel } = require("../productModel");
const listProduct = async () => {
    const products = await productModel.find();
    return products;
};

const listPageProduct = async (
    page = 1,
    itemPerPage = 9,
    sort = {},
    filter = {}
) => {
    const options = {
        page: page,
        limit: itemPerPage,
        sort: sort,
    };
    var products = await productModel
        .paginate(filter, options)
        .catch((err) => console.log(err));
    return products;
};
const getComments = async (productId) => {
    const product = await productModel.findOne({
        _id: mongoose.mongo.ObjectID(productId),
    });

    return product.comments;
};
const postComment = async (comment, productId) => {
    const product = await productModel
        .findOne({
            _id: mongoose.mongo.ObjectID(productId),
        })
        .catch((err) => {
            throw TypeError("error");
        });

    product.comments.push(comment);
    await product.save().catch((err) => {
        throw TypeError("error");
    });
};
module.exports = { listProduct, listPageProduct, getComments, postComment };
