/* globals module require */

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/main-controller")(data);

    let router = new express.Router();

    router.get("/", controller.getInvoice);

    app.use("/invoice", router);
};