/* globals require module String */
"use strict";

const mongoose = require("mongoose");

const constants = require("../config/constants");

let companysettingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: constants.minCompanyNameLength,
        maxlength: constants.maxCompanyNameLength
    },
    bulstat: {
        type: String,
        required: true,
        minlength: constants.minIdentityLength,
        maxlength: constants.maxIdentityLength
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
        data: Buffer,
        contentType: String
    },
    user: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

companysettingsSchema
    .virtual('identity')
    .get(function() {
        if (this.useTax) {
            return "BG" + this.bulstat;
        } else {
            return "";
        }
    });

mongoose.model("CompanySettings", companysettingsSchema);
let CompanySettingsModel = mongoose.model("CompanySettings");
module.exports = CompanySettingsModel;