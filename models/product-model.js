/* globals require module String */
"use strict";

const mongoose = require("mongoose");

const constants = require("../config/constants");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: constants.minProductNameLength,
        maxlength: constants.maxProductNameLength
    },
    description: String,
    user: {
        type: String,
        required: true
    }
});

mongoose.model("Product", productSchema);
let ProductModel = mongoose.model("Product");
module.exports = ProductModel;