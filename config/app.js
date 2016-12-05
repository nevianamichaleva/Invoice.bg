/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require('connect-flash');

module.exports = function(data) {
    let app = express();

    app.use(cookieParser('invoice'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(expressSession({ secret: 'invoice', resave: true, saveUninitialized: true, cookie: { secure: false, maxAge: 2160000000 } }));
    app.use(flash());

    // security
    require("./security.js")(app);

    // passport
    require("./passport/passport.js")(app, data);

    app.set("view engine", "pug");

    app.use("/static", express.static("public"));

    return app;
};