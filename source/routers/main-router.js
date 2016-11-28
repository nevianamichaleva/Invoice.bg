/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/main-controller")(data);

    let router = new express.Router();

    router
        .get("/home", controller.getHome)
        .get("/user", controller.getUser)
        .get("/about-us", controller.getAboutUs);

    app.use(router);
};