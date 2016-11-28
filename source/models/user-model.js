/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50
    },
    name: String,
    email: {
        type: String,
        required: true
    },
    password: String
});

mongoose.model("User", userSchema);
let UserModel = mongoose.model("User");
module.exports = UserModel;