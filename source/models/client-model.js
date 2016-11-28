/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    bulstat: {
        type: String,
        required: true,
        unique: true,
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
    email: {
        type: String,
        required: true
    },
    accountablePerson: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

clientSchema.virtual.identity = function() {
    if (this.useTax) {
        return "BG" + this.busltat;
    }
    else {
        return "";
    }
};

mongoose.model("Client", clientSchema);
let ClientModel = mongoose.model("Client");
module.exports = ClientModel;