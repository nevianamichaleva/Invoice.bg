/* globals module require */
"use strict";

const LocalStrategy = require('passport-local');

module.exports = function(passport, data) {
    passport.use("local-login", new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        data.getUserByUsername(username)
            .then(user => {
                if (!user) {
                    return done(null, false, req.flash('signupMessage', 'Невалидно потребителско име'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('signupMessage', 'Невалидна парола'));
                }
                return done(null, user);
            })
            .catch(() => {
                done(null, false, {
                    success: false,
                    message: "Incorrect username"
                });
            });
    }));
}