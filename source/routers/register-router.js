/* globals module require */

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/main-controller")(data),
        authentication = require("../controllers/authentication-controller")(data);

    let router = new express.Router();

    router.get("/", controller.getRegister);
    router.post("/", authentication.register);

    app.use("/register", router);
};