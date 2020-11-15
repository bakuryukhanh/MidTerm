const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const Handlebars = require("hbs");
const homeRouter = require("./routers/home");
const aboutRouter = require("./routers/about");
const checkoutRouter = require("./routers/checkout");
const contactRouter = require("./routers/contact");
const galleryRouter = require("./routers/gallery");
const accountRouter = require("./routers/account");
const shopRouter = require("./routers/shop");
const cartRouter = require("./routers/cart");
const loginRouter = require("./routers/login");

const app = express();
var sess;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

Handlebars.registerHelper("pages", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "active" : "";
});

Handlebars.registerHelper("sortType", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "selected " : "";
});

var cart = { item: 2 };
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "somesecret",
        cookie: { maxAge: 60000 },
    })
);

app.use("/", homeRouter);
app.use("/about", aboutRouter);
app.use("/gallery", galleryRouter);
app.use("/contact", contactRouter);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);
app.use("/account", accountRouter);
app.use("/checkout", checkoutRouter);
app.use("/login", loginRouter);

module.exports = app;
