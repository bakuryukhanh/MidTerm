const { userModel, FBuserModel } = require("../userModel");
const { ObjectId } = require("mongodb");
const addUser = async (data) => {
    const user = new userModel(data);
    await user.save();
};
const findUser = async (filter) => {
    const user = await userModel.findOne(filter);
    return user;
};
const updateAva = async (id, imgSrc) => {
    const user = await userModel.findOne({ _id: ObjectId(id) });
    user.imgSrc = imgSrc;
    await user.save();
};
const FindOrCreateFB = async (profile) => {
    const user = await FBuserModel.findOne({ facebookId: profile.id });
    if (!user) {
        const newuser = new FBuserModel({
            facebookId: profile.id,
            name: profile.displayName,
            imgSrc: profile.photos[0].value,
        });
        await newuser.save();
        return newuser;
    }
    return user;
};
module.exports = { addUser, updateAva, findUser, FindOrCreateFB };
