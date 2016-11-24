/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Invoice } = models;
    return {
        createInvoice(number, date, company, client, ...products, sum, vat) {
            if (Array.isArray(products[0])) {
                products = products[0];
            }

            const invoice = new Invoice({
                number,
                date,
                company: {
                    name: company.name,
                    identity: company.identity,
                    address: company.address,
                    accountablePerson: company.accountablePerson
                },
                client: {
                    name: client.name,
                    identity: client.identity,
                    address: client.address,
                    accountablePerson: client.accountablePerson
                },
                products,
                sum,
                vat
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
        getAllInvoices() {
            return new Promise((resolve, reject) => {
                const query = Invoice.find()
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