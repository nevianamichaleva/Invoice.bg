/* globals require module Promise*/
"use strict";

const validator = require("./utils/validator");

module.exports = function(models) {
    let {
        User
    } = models;
    return {
        createUser(data) {
            let error = validator.validateUser(data);
            if (error) {
                return Promise.reject({ reason: error });
            }

            const user = new User({
                username: data.username,
                name: data.name,
                email: data.email,
                password: ""
            });

            user.password = user.generateHash(data.password);

            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        updateUser(data) {
            return new Promise((resolve, reject) => {
                User.findByIdAndUpdate(data._id, {
                        $set: data
                    }, { new: true },
                    (err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    username
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user || null);
                });
            });
        },
        getUserByUsernameAndEmail(username, email) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    username,
                    email
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user || null);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    _id: id
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user || null);
                });
            });
        }
    };
};