const { FeedBackModel } = require("../contactModel");
const saveFeedBack = async (data) => {
    const newFeedBack = new FeedBackModel(data);
    await newFeedBack.save();
};
exports = { saveFeedBack };
