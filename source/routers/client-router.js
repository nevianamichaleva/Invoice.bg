/* globals module require */
"use strict";

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/client-controller")(data);

    let router = new express.Router();

    router
        .get("/search/:pattern", controller.getClientByTerm)
        .get("/:id", controller.getClientById)

    app.use("/client", router);
};