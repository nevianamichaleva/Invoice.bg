/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let invoiceSchema = new mongoose.Schema({
    number: {
        type: Number,
        require: true,
        length: 10
    },
    date: {
        type: Date,
        default: new Date()
    },
    company: {
        name: String,
        identity: String,
        address: String,
        accountablePerson: String
    },
    client: {
        name: String,
        identity: String,
        address: String,
        accountablePerson: String
    },
    products: {
        type: [{
            name: String,
            price: Number,
            quantity: {
                type: Number,
                default: 0
            },
            unit: String
        }]
    },
    sum: Number,
    vat: Number
});

invoiceSchema.virtual.total = function() {
    return this.sum + this.vat;
};

mongoose.model("Invoice", invoiceSchema);
let InvoiceModel = mongoose.model("Invoice");
module.exports = InvoiceModel;