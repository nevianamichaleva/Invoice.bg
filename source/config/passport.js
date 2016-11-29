'use struct';

const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    userModel = require('../models/user-model.js'),
    bcrypt = require("bcrypt-nodejs");



// configure LocalStrategy

const authStartegy = new LocalStrategy(function (username, password, done) {
    userModel.findOne({
            username: username,
            password: password
        },
        function (error, user) {

            if (user) {
                return done(null, user);
            }

            return done(null, false);
        });
});

passport.use(authStartegy);

passport.serializeUser((user, done) => {

    if (user) {
        return done(null, user._id);
    }

    return done(null, false);
});


passport.deserializeUser((userId, done) => {
    userModel.findOne({
        '_id': userId
    }, function (error, user) {
        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
});


passport.use("local-login", new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
        userModel.findOne({
            username: username
        },
        function (err, user) {
            if (err) {
                return done(null, false);
            }

            if (user) {
                return done(null, user);
            }

            if (!user.validPassword(password)) {
                return done(null, false);
            }

            return done(null, false);
        });
}));


module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
}