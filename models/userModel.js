const mongoose = require("../mongoose/mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    imgSrc: String,
    password: String,
    phoneNumber: String,
    address: String,
    facebookId: String,
});
let userModel = mongoose.model("user", userSchema);
const FBUserShema = new mongoose.Schema({
    name: String,
    facebookId: {
        type: String,
        required: true,
    },
    imgSrc: String,
});
let FBUserModel = mongoose.model("FBuser", FBUserShema);
module.exports.FBuserModel = FBUserModel;
module.exports.userModel = userModel;
