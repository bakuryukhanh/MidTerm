//npm packages

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const Handlebars = require("hbs");
const { passport } = require("./authorized/passportjs");

//Routes
const homeRouter = require("./routers/home");
const aboutRouter = require("./routers/about");
const checkoutRouter = require("./routers/checkout");
const contactRouter = require("./routers/contact");
const galleryRouter = require("./routers/gallery");
const accountRouter = require("./routers/account");
const shopRouter = require("./routers/shop");
const cartRouter = require("./routers/cart");
const userRouter = require("./routers/user");
const discountRouter = require("./routers/discount");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

Handlebars.registerHelper("pages", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "active" : "";
});
Handlebars.registerHelper("filters", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "active" : "";
});

Handlebars.registerHelper("sortType", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "selected " : "";
});
Handlebars.registerHelper("drinkType", function (value) {
    if (value == "hot")
        return `  <div class="type-lb">
                    <p class="sale">Hot</p>
                </div>`;
    if (value == "new")
        return `  <div class="type-lb">
                    <p class="new">New</p>
                </div>`;
    return "";
});

var blocks = {};
Handlebars.registerPartials(__dirname + "/views/partials");
Handlebars.registerHelper("extend", function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
});
Handlebars.registerHelper("block", function (name) {
    var val = (blocks[name] || []).join("\n");

    // clear the block
    blocks[name] = [];
    return val;
});
Handlebars.registerHelper("paginate", function (totalPages, currentPage) {
    var string = ``;
    for (let i = 1; i <= totalPages; i++) {
        if (i == currentPage) {
            string += `<li class="page-item active"><button class="page-link" value=${i}>${i}</button></li>`;
        } else {
            string += `<li class="page-item"><button class="page-link" value=${i}>${i}</button></li>`;
        }
    }
    return string;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.resolve("./public")));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "somesecret",
        cookie: { maxAge: 600000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/user/login",
    })
);
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);
app.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/user/login",
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
app.use("/user", userRouter);
app.use("/discount", discountRouter);

module.exports = app;
