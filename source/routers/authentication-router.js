/* globals module require */
"use strict";

const express = require("express"),
    passport = require("passport");

module.exports = function(app, data) {
    let controller = require("../controllers/authentication-controller")(data);

    let router = new express.Router();

    router
        .get("/login", controller.getLogin)
        .get("/register", controller.getRegister)
        .post("/login",
            passport.authenticate('local', {
                failureRedirect: '/register'
            }),
            controller.login)
        .post("/register", controller.register)
        .post("/logout", controller.logout)

    app.use(router);
};