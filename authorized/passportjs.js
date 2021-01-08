const { to } = require("await-to-js"),
    bcrypt = require("bcryptjs"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    GoogleStrategy = require("passport-google-oauth20").Strategy;

const UserService = require("../models/services/UserServices");
const User = require("../models/userModel");
const config = require("../config");
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async function (email, password, done) {
            const user = await UserService.findUser({
                email: email,
            }).catch((err) => {
                return done(err);
            });
            const [err, res] = await to(
                bcrypt.compare(password, user.password)
            );
            if (err) {
                var errorMsg = "ERROR";
                return done(errorMsg);
            }
            if (!res) {
                console.log("failed");
                return done(null, false, {
                    message: "Username or password wrong",
                });
            }
            return done(null, user);
        }
    )
);

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

passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleAuth.clientId,
            clientSecret: config.googleAuth.clientSecret,
            callbackURL: "/google/callback",
        },
        async function (token, tokenSecret, profile, done) {
            const user = await UserService.FindOrCreateGG(profile);
            done(null, user);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const [err, normalUser] = await to(User.userModel.findById(id));
    if (err) {
        return done(err);
    }

    done(null, normalUser);
});
const loginAuthenrize = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            const error = {};
            error.status = 401;
            error.message = info.message;
            return res.json(error);
        }
        req.logIn(user, function (err) {
            console.log(err);
            console.log(req.user);
        });
        next();
    })(req, res, next);
};

module.exports = { loginAuthenrize, passport };
