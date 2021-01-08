const { userModel } = require("../userModel");
const { ObjectId } = require("mongodb");
const { to } = require("await-to-js");
const mongoose = require("../../mongoose/mongoose");
const addUser = async (data) => {
    const user = new userModel(data);
    var [err] = await to(user.save());
    if (err) throw new Error("Save Failed");
};
const findUser = async (filter) => {
    var [err, user] = await to(userModel.findOne(filter));
    if (err) {
        throw new Error("Finding User failed");
    }
    return user;
};
const updateAva = async (id, imgSrc) => {
    const user = await userModel.findOne({ _id: ObjectId(id) });
    user.imgSrc = imgSrc;
    var [err] = await to(user.save());
    if (err) {
        throw new Error("Saving User Failed");
    }
};
const FindOrCreateFB = async (profile) => {
    const user = await userModel.findOne({ facebookId: profile.id });
    if (!user) {
        const newuser = new userModel({
            facebookId: profile.id,
            name: profile.displayName,
            imgSrc: profile.photos[0].value,
        });
        var [err] = await to(newuser.save());
        if (err) {
            throw new Error("Saving User Failed");
        }
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
        var [err] = await to(newuser.save());
        if (err) {
            throw new Error("Saving User Failed");
        }

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
const removeFavList = async (id, productId) => {
    const user = await userModel.findOne({
        _id: mongoose.mongo.ObjectID(id),
    });
    console.log(productId);
    var index = user.favouriteList.indexOf(productId);
    console.log(index);
    if (index > -1) {
        user.favouriteList.splice(index, 1);
    }
    console.log(user.favouriteList);
    user.save();
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
const getBillById = async (userId, billId) => {
    const user = await userModel
        .findOne({
            _id: mongoose.mongo.ObjectID(userId),
        })
        .catch((err) => {
            throw new Error("finding USer failed");
        });
    const found = user.bills.find((bill) => {
        return bill._id == billId;
    });
    return found;
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
    getBillById,
    removeFavList,
};
