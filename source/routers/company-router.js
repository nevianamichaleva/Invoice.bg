/* globals module require */
"use strict";

const express = require("express"),
    multer = require('multer');
module.exports = function(app, data) {
    let controller = require("../controllers/company-controller")(data);

    let router = new express.Router();

    router
        .get("/", controller.checkCompanySettings)
        .get("/create", controller.getBlankCompanySettings)
        .get("/settings", controller.getCompanySettings)
        .post("/create", multer({ dest: './uploads/' }).single('upl'), controller.createCompanySettings)
        .post("/settings", multer({ dest: './uploads/' }).single('upl'), controller.changeCompanySettings)

    app.use("/company", router);
};