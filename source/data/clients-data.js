/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Client } = models;
    return {
        createClient(data) {
            const client = new Client({
                name: data.name,
                bulstat: data.bulstat,
                useTax: data.useTax,
                city: data.city,
                address: data.address,
                email: data.email,
                accountablePerson: data.accountablePerson,
                phone: data.phone,
                user: data.user
            });

            return new Promise((resolve, reject) => {
                client.save(err => {
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