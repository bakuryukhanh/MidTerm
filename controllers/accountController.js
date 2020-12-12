exports.index = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.send("you need to login");
    }
    res.render("pages/account", { page: "account", user: req.user });
};
