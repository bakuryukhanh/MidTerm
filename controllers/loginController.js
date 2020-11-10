exports.index = (req, res, next) => {
    sess = req.session;
    if (sess.Login) {
        res.redirect("/");
    }
    res.render("login");
};
exports.login = (req, res, next) => {
    req.session.Login = req.body;
    sess = req.session;
    res.end("done");
};
