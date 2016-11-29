/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let {
        User
    } = models;
    return {
        createUser(data) {
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
                User.findOne({ _id: data._id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    user.name = data.name;
                    user.email = data.email;
                    user.password = data.password;

                    user.save(err1 => {
                        if (err1) {
                            return reject(err1);
                        }

                        return resolve(user);
                    });
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    username
                }, (err, clients) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(clients);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({
                    _id: id
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};