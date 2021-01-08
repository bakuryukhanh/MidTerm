const mongoose = require("../mongoose/mongoose");
const TableBookingSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    other: String,
    date: String,
    time: String,
    numOfGuests: Number,
    confirmed: Boolean,
});
let TableBookingModel = mongoose.model("tableBooking", TableBookingSchema);

exports.TableBookingModel = TableBookingModel;
