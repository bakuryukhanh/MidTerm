function authUser(req, res, next) {
    var sess = req.session;
    if (sess.Login == null) {
        res.status(403);
        res.send("You need to Login");
    }
    next();
}
module.exports = { authUser };
