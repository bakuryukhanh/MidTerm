const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const logger = require("morgan");
const Handlebars = require("hbs");
const homeRouter = require("./routers/home");
const aboutRouter = require("./routers/about");
const checkoutRouter = require("./routers/checkout");
const contactRouter = require("./routers/contact");
const galleryRouter = require("./routers/gallery");
const myaccountRouter = require("./routers/myaccount");
const shopRouter = require("./routers/shop");
const cartRouter = require("./routers/cart");
const wishlistRouter = require("./routers/wishlist");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
Handlebars.registerHelper("pages", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "active" : "";
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/gallery", galleryRouter);
app.use("/contact", contactRouter);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);

module.exports = app;
