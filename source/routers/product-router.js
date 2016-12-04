/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/product-controller")(data);

    let router = new express.Router();

    router
        .get("/search/:pattern", controller.getProductByPattern)

    app.use("/product", router);
};