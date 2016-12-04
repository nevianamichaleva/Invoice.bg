/* globals require module String */
"use strict";

const mongoose = require("mongoose");

const constants = require("../config/constants");

let clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: constants.minClientNameLength,
        maxlength: constants.maxClientNameLength
    },
    identity: {
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

clientSchema
    .virtual('zdds')
    .get(function() {
        return "BG" + this.identity;
    });

mongoose.model("Client", clientSchema);
let ClientModel = mongoose.model("Client");
module.exports = ClientModel;