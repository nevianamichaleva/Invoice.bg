/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/company-controller")(data);

    let router = new express.Router();

    router
        .get("/", controller.checkCompanySettings)
        .get("/create", controller.getBlankCompanySettings)
        .get("/settings", controller.getCompanySettings)
        .post("/create", controller.createCompanySettings)
        .post("/settings", controller.changeCompanySettings)

    app.use("/company", router);
};