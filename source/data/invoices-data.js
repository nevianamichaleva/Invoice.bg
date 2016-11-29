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
        getAllInvoices(user, page, pageSize) {
            let skip = (page - 1) * pageSize,
                limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Invoice.find()
                        .sort({ date: "desc" })
                        .skip(skip)
                        .limit(limit)
                        .exec((err, invoices) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(invoices);
                        });
                }), new Promise((resolve, reject) => {
                    Invoice.count({})
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]).then(results => {
                let [invoices, count] = results;
                return { invoices, count };
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