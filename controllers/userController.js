const { userModel } = require("../models/userModel");
const { uploadImg } = require("../models/services/UploadImageService");
const UserServices = require("../models/services/UserServices");
const formidable = require("formidable");

exports.index = (req, res, next) => {
    var sess = req.session;
    if (sess.Login) {
        res.redirect("/");
    }
    res.render("pages/login-signup");
};
exports.login = async (req, res, next) => {
    var sess;
    const user = await userModel.findOne(req.body).catch((err) => {
        console.err(err);
    });
    if (user != null) {
        console.log(user);
        req.session.Login = user;
        sess = req.session;
        res.json({ log: "success" });
    } else {
        res.json({ log: "failed" });
    }
};
exports.signup = async (req, res, next) => {
    const form = formidable({ multiples: true });
    var user;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        if (files.image && files.image.size > 0) {
            await uploadImg(files.image.path).then(
                (url) => (fields.imgSrc = url)
            );
        } else {
            fields.imgSrc =
                "https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg";
        }
        user = fields;
        await UserServices.addUser(user);
        res.json({ log: "success" });
    });
};
exports.updateAva = async (req, res, next) => {
    const form = formidable({ multiples: true });
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        if (files.image && files.image.size > 0) {
            await uploadImg(files.image.path).then(
                (url) => (fields.imgSrc = url)
            );
        }
        await UserServices.updateAva(req.session.Login._id, fields.imgSrc);
        console.log(req.session.Login.imgSrc);
        req.session.Login.imgSrc = fields.imgSrc;
        console.log(req.session.Login.imgSrc);
        res.json({ log: "success" });
    });
};
exports.signout = (req, res, next) => {
    sess = req.session;
    sess.Login = null;
    res.end("done");
};
