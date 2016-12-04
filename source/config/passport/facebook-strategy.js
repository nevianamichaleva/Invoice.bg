"use strict";

const FacebookStrategy = require("passport-facebook");

const FACEBOOK = {
    APP_ID: "181031059027113",
    APP_SECRET: "141bb798eceac1e67735aa1d1aeabc2a",
    callbackURL: "http://localhost:3001/login/facebook/callback"
};

module.exports = function (passport, userModel) {
    const facebookAuthStrategy = new FacebookStrategy({
            clientID: FACEBOOK.APP_ID,
            clientSecret: FACEBOOK.APP_SECRET,
            callbackURL: FACEBOOK.callbackURL,
            profileFields: ['id', 'emails', 'name']
        },
        function (accessToken, refreshToken, profile, done) {
            
            const promise = new Promise((res, rej) => {
                    userModel.findOne({
                        username: profile.displayName.toString(),
                        email: profile.emails[0].value
                    }, (err, user) => {
                        if (err) {
                            return rej(err);
                        }

                        return res(user);
                    });
                })
                .then((user) => {
                    if (user) {
                        return user;
                    } else {
                        let user = new userModel({
                            name: profile.displayName.toString(),
                            email: profile.emails[0].value,
                            username: profile.displayName.toString(),
                            provider: 'facebook',
                            facebook: profile._json
                        });
                        user.save(function (err) {
                            if (err) console.log(err);
                            return done(err, user);
                        });
                    }
                })
                .then((user) => {
                    return done(null, user);
                })
                .catch(error => done(error, false));
        });

    passport.use(facebookAuthStrategy);
};