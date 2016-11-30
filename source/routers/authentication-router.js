/* globals module require */
"use strict";

const express = require("express"),
    expressValidator = require("express-validator"),
    passport = require("passport");

module.exports = function(app, data) {
    let controller = require("../controllers/authentication-controller")(data);

    let router = new express.Router();


    app.use(expressValidator());

    router
        .get("/login", controller.getLogin)
        .get("/register", controller.getRegister)
        .post("/login",
            passport.authenticate('local-login', {
                failureRedirect: '/register',
                passReqToCallback: true,
                failureFlash: true
            }),
            controller.login)
        .post("/register", controller.register)
        .get("/logout", controller.logout);

    app.use(router);
};