const { productModel } = require("../productModel");
const listProduct = async () => {
    const products = await productModel.find();
    return products;
};
const listPageProduct = async (page, itemPerPage, sort = {}, filter = {}) => {
    const options = {
        page: page,
        limit: itemPerPage,
        sort: sort,
    };
    console.log(filter);
    var products = await productModel
        .paginate(filter, options)
        .catch((err) => console.log(err));
    return products;
};
module.exports = { listProduct, listPageProduct };
