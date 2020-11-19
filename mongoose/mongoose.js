const mongoose = require("mongoose");
const server =
    "mongodb+srv://bakuryukhanh:khanhkhanh1@cluster0.mpgum.mongodb.net/CoffeeShop?retryWrites=true&w=majority";
const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(server, option)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error");
    });

module.exports = mongoose;
