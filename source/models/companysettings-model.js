/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let companysettingsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    identity: {
        type: String,
        require: true,
        unique: true,
        minlength: 9,
        maxlength: 13
    },
    useTax: Boolean,
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    accountablePerson: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true,
        default: "http://www.chadomoto.com/wp-content/uploads/2014/06/x-empty.png"
    },
    user: {
        type: String,
        require: true
    }
});

mongoose.model("CompanySettings", companysettingsSchema);
let CompanySettingsModel = mongoose.model("CompanySettings");
module.exports = CompanySettingsModel;