/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Client } = models;
    return {
        createClient(name, identity, useTax, address, email, accountablePerson, phone) {
            const client = new Client({
                name,
                identity,
                useTax,
                address,
                email,
                accountablePerson,
                phone
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
        getAllClients() {
            return new Promise((resolve, reject) => {
                const query = Client.find()
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