const { userModel } = require("../userModel");
const { ObjectId } = require("mongodb");
const addUser = async (data) => {
    const user = new userModel(data);
    await user.save();
};
const updateAva = async (id, imgSrc) => {
    const user = await userModel.findOne({ _id: ObjectId(id) });
    user.imgSrc = imgSrc;
    await user.save();
};
module.exports = { addUser, updateAva };
