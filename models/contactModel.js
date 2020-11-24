const mongoose = require("../mongoose/mongoose");
const feedBackSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: Date,
});
let feedBackModel = mongoose.model("feedback", feedBackSchema);
module.exports.FeedBackModel = feedBackModel;
