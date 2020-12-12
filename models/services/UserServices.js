const { userModel } = require("../userModel");
const { ObjectId } = require("mongodb");
const mongoose = require("../../mongoose/mongoose");
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
    const user = await userModel.findOne({ facebookId: profile.id });
    if (!user) {
        const newuser = new userModel({
            facebookId: profile.id,
            name: profile.displayName,
            imgSrc: profile.photos[0].value,
        });
        console.log(newuser);
        await newuser.save().catch((err) => console.log("ERROR", err));
        return newuser;
    }
    return user;
};
const FindOrCreateGG = async (profile) => {
    const user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
        const newuser = new userModel({
            googleId: profile.id,
            name: profile.displayName,
            imgSrc: profile.photos[0].value,
        });

        await newuser.save().catch((err) => console.log("ERROR", err));
        return newuser;
    }
    return user;
};
const add2FavouriteList = async (id, productId) => {
    const user = await userModel.findOne({ _id: mongoose.mongo.ObjectID(id) });
    user.favouriteList.push(productId);
    user.save();
};
const getFavouriteList = async (id) => {
    const user = await userModel.findOne({ _id: mongoose.mongo.ObjectID(id) });
    return user.favouriteList;
};
const checkExistFavList = async (id, productId) => {
    const user = await userModel.findOne({ _id: mongoose.mongo.ObjectID(id) });
    return user.favouriteList.includes(productId);
};
const addBill = async (id, bill) => {
    const user = await userModel.findOne({ _id: mongoose.mongo.ObjectID(id) });
    user.bills.push(bill);
    user.save();
};
const getBills = async (id) => {
    const user = await userModel.findOne({ _id: mongoose.mongo.ObjectID(id) });
    return user.bills;
};
module.exports = {
    addUser,
    updateAva,
    findUser,
    FindOrCreateFB,
    FindOrCreateGG,
    checkExistFavList,
    add2FavouriteList,
    getFavouriteList,
    addBill,
    getBills,
};
