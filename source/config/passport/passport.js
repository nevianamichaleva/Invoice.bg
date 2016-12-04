'use struct';

const passport = require('passport');

module.exports = function(app, data) {
    passport.serializeUser((user, done) => {

        if (user) {
            return done(null, user._id);
        }

        return done(null, false);
    });


    passport.deserializeUser((userId, done) => {
        data.findUserById(userId)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => {
                done(err, false);
            });
    });

    require('./local-strategy.js')(passport, data);
    require('./facebook-strategy')(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());
};