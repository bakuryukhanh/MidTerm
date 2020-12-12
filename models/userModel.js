const mongoose = require("../mongoose/mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: function () {
            if (this.facebookId == null && this.googleId == null) {
                return true;
            }
            return false;
        },
        index: true,
        sparse: true,
        unique: true,
    },
    imgSrc: String,
    password: String,
    phoneNumber: String,
    address: String,
    facebookId: String,
    googleId: String,
    bills: Array,
    favouriteList: Array,
});
let userModel = mongoose.model("user", userSchema);
module.exports.userModel = userModel;
