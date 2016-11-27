/* globals module */

const express = require("express"),
      bodyParser = require("body-parser"),
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser");

let app = express();

// configure body-parser and express-session
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: 'invoice'}));

// passport
require('./passport.js')(app);

app.set("view engine", "pug");

app.use("/static", express.static("public"));

module.exports = app;