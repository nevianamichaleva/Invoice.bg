/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let companysettingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    bulstat: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 13
    },
    useTax: Boolean,
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: String,
    accountablePerson: {
        type: String,
        required: true
    },
    phone: String,
    logo: {
        type: String,
        default: "http://www.chadomoto.com/wp-content/uploads/2014/06/x-empty.png"
    },
    user: {
        type: String,
        required: true
    }
});

companysettingsSchema.virtual.identity = function() {
    if (this.useTax) {
        return "BG" + this.busltat;
    } else {
        return "";
    }
};

mongoose.model("CompanySettings", companysettingsSchema);
let CompanySettingsModel = mongoose.model("CompanySettings");
module.exports = CompanySettingsModel;