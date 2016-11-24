/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Invoice } = models;
    return {
        createInvoice(data, ...products) {
            if (Array.isArray(products[0])) {
                products = products[0];
            }

            const invoice = new Invoice({
                number: data.number,
                date: data.date,
                company: {
                    name: data.company.name,
                    identity: data.company.identity,
                    address: data.company.address,
                    accountablePerson: data.company.accountablePerson
                },
                client: {
                    name: data.client.name,
                    identity: data.client.identity,
                    address: data.client.address,
                    accountablePerson: data.client.accountablePerson
                },
                products,
                sum: data.sum,
                vat: data.vat,
                user: data.user
            });

            return new Promise((resolve, reject) => {
                invoice.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        },
        getAllInvoices(user) {
            return new Promise((resolve, reject) => {
                const query = Invoice.find({ user })
                    .sort({ date: "desc" });
                query.exec((err, invoices) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(invoices);
                });
            });
        },
        getInvoiceById(id) {
            return new Promise((resolve, reject) => {
                Invoice.findById(id, (err, invoice) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        }
    };
};