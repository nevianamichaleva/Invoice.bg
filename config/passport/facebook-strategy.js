/* globals module require */
"use strict";

const FacebookStrategy = require("passport-facebook");

const FACEBOOK = {
    APP_ID: "181031059027113",
    APP_SECRET: "141bb798eceac1e67735aa1d1aeabc2a",
    callbackURL: "http://localhost:3001/login/facebook/callback"
};

module.exports = function(passport, data) {
    const facebookAuthStrategy = new FacebookStrategy({
            clientID: FACEBOOK.APP_ID,
            clientSecret: FACEBOOK.APP_SECRET,
            callbackURL: FACEBOOK.callbackURL,
            profileFields: ['id', 'emails', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            let username = profile.displayName.toString(),
                email = profile.emails[0].value;

            data.getUserByUsernameAndEmail(username, email)
                .then(user => {
                    if (user) {
                        return user;
                    } else {
                        return data.createUser({
                            name: profile.displayName.toString(),
                            email: profile.emails[0].value,
                            username: profile.displayName.toString(),
                            provider: 'facebook',
                            facebook: profile._json
                        });
                    }
                })
                .then(user => {
                    done(null, user);
                })
                .catch(err => done(err, false));
        });

    passport.use(facebookAuthStrategy);
};