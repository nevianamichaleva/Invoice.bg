/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Client } = models;
    return {
        createClient(data) {
            const client = new Client({
                name: data.name,
                identity: data.identity,
                useTax: data.useTax,
                address: data.address,
                email: data.email,
                accountablePerson: data.accountablePerson,
                phone: data.phone,
                user: data.user
            });

            return new Promise((resolve, reject) => {
                client.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(client);
                });
            });
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
        }
    };
};