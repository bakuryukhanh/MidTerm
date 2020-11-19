const mongoose = require("../mongoose/mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        },
    },
    password: String,
    phoneNumber: String,
    address: String,
});
let userModel = mongoose.model("user", userSchema);
module.exports.userModel = userModel;
