/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Invoice } = models;
    return {
        createInvoice(data, ...products) {
            // if (Array.isArray(products[0])) {
            //     products = products[0];
            // }

            const invoice = new Invoice({
                number: data.number,
                date: data.date,
                company: data.company,
                client: data.client,
                products,
                sum: data.sum,
                vat: data.vat,
                user: data.user
            });

            return new Promise((resolve, reject) => {
                invoice.save(err => {
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