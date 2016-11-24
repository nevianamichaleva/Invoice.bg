/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    eik: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mol: {
        type: String,
        required: true
    }
});
mongoose.model("Company", schema);

module.exports = mongoose.model("Company");