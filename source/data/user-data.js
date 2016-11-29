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
                user.save((err) => {
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