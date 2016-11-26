/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/company-controller")(data);

    let router = new express.Router();

    router
        .get("/", controller.getCompany)
        .get("/create", controller.getCompanySettings)
        .get("/settings", controller.getCompanySettings)
        .post("/create", controller.createCompany)
        .post("/settings", controller.companySettings)

    app.use("/company", router);
};