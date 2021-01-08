const { TableBookingModel } = require("../models/TableBookingModel");
exports.index = async (req, res, next) => {
    await res.render("pages/table-booking");
};
exports.submitForm = async (req, res, next) => {
    const newTableBooking = new TableBookingModel(req.body);
    newTableBooking.confirmed = false;
    await newTableBooking.save();
    res.end("done");
};
