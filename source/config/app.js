/* globals module */

const express = require("express"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require('connect-flash');

let app = express();

// configure body-parser and express-session
app.use(cookieParser('invoice'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(expressSession({ secret: 'invoice', cookie: { maxAge: 60000 } }));
app.use(flash());

// passport
require('./passport/passport.js')(app);

app.set("view engine", "pug");

app.use("/static", express.static("public"));

module.exports = app;