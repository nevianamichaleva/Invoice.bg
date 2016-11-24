/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 100
    },
    description: String,
    user: {
        type: String,
        require: true
    }
});

mongoose.model("Product", productSchema);
let ProductModel = mongoose.model("Product");
module.exports = ProductModel;