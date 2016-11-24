/* globals module require __dirname */
"use strict";

const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = function(config) {
    mongoose.connect(config.connectionString);
    let User = require("../models/user-model.js");
    let Client = require("../models/client-model.js");
    let CompanySettings = require("../models/companysettings-model.js");
    let Product = require("../models/product-model.js");
    let Invoice = require("../models/invoice-model.js");
    let models = { User, Client, CompanySettings, Product, Invoice };
    let data = {};

    fs.readdirSync("./source/data")
    .filter(file => file.includes("-data"))
    .forEach(file => {
        let dataModule = require(path.join(__dirname, file))(models);
        Object.keys(dataModule)
        .forEach(key => {
            data[key] = dataModule[key];
        });
    });
    return data;
};