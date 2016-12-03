/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Client } = models;
    return {
        createClient(data) {
            return new Promise((resolve, reject) => {
                Client.findOne({ user: data.user, name: data.name }, (err, client) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!client) {
                        let newClient = new Client(data);
                        newClient.save(err => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(newClient);
                        });
                    } else {
                        for (let prop in data) {
                            if (data[prop] !== client[prop]) {
                                let newClient = new Client(data);
                                newClient.save(err => {
                                    if (err) {
                                        return reject(err);
                                    }

                                    return resolve(newClient);
                                })

                                return;
                            }
                        }
                    }
                    return resolve(client);
                });
            })
        },
        getAllClients(user) {
            return new Promise((resolve, reject) => {
                const query = Client.find({ user })
                    .sort({ name: "asc" });

                query.exec((err, clients) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(clients);
                });
            });
        },
        getClientById(id) {
            return new Promise((resolve, reject) => {
                Client.findById(id, (err, client) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(client);
                });
            });
        },
        getClientByTerm(term) {
            return new Promise((resolve, reject) => {
                var regex = new RegExp(term, 'i');
                Client.find({name: regex}, { 'name': 1 })
                    .sort({ name: "asc" })
                    .limit(20)
                    .lean()
                    .exec((err, clients) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(clients);
                    return resolve(clients);
                });
            });
        }
    };
};