/* globals require module String */
"use strict";

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 6,
        maxlength: 50
    },
    name: String,
    email: {
        type: String,
        require: true
    },
    password: String
});

mongoose.model("User", userSchema);
let UserModel = mongoose.model("User");
module.exports = UserModel;