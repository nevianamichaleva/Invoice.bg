/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let clientSchema = new mongoose.Schema({
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
    }
});

mongoose.model("Client", clientSchema);
let ClientModel = mongoose.model("Client");
module.exports = ClientModel;