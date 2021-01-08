exports.index = (req, res, next) => {
    if (!req.user) {
        return res.render("login-needed");
    }
    res.render("pages/account", { page: "account", user: req.user });
};
