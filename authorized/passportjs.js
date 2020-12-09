const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy;

const UserService = require("../models/services/UserServices");
const User = require("../models/userModel");
const config = require("../config");
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async function (email, password, done) {
            const user = await UserService.findUser({
                email: email,
                password: password,
            }).catch((err) => {
                return done(err);
            });
            if (!user) {
                return done(null, false, {
                    message: "Username or password wrong",
                });
            }
            return done(null, user);
        }
    )
);
passport.serializeUser(function (user, done) {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    var user;
    const normalUser = await User.userModel.findById(id);
    if (normalUser) user = normalUser;
    const FBUser = await User.FBuserModel.findById(id);
    if (FBUser) user = FBUser;
    done(null, user);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebookAuth.clientId,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callbackURL,
            profileFields: [
                "id",
                "displayName",
                "name",
                "gender",
                "picture.type(large)",
                "email",
            ],
        },
        async function (accessToken, refreshToken, profile, done) {
            const user = await UserService.FindOrCreateFB(profile);
            done(null, user);
        }
    )
);
const loginAuthenrize = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            const error = {};
            error.status = 401;
            error.message = info.message;
            res.json(error);
        }
        req.logIn(user, function (err) {
            console.log(err);
            console.log(req.user);
        });
        return next();
    })(req, res, next);
};
module.exports = { loginAuthenrize, passport };
