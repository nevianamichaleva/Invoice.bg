/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    products: {
        type: [{
            name: String,
            price: Number,
            unit: String,
            _id: String
        }],
        default: []
    }
});

mongoose.model("Category", categorySchema);
let CategoryModel = mongoose.model("Category");
module.exports = CategoryModel;