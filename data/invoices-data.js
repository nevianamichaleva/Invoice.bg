/* globals require module Promise*/
"use strict";

const validator = require("./utils/validator");

module.exports = function(models) {
    let { Invoice } = models;
    return {
        createInvoice(data) {
            let error = validator.validateInvoice(data);
            if (error) {
                return Promise.reject({ reason: error });
            }

            let invoice = new Invoice(data);
            return new Promise((resolve, reject) => {
                invoice.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        },
        updateInvoice(id, data) {
            let error = validator.validateInvoice(data);
            if (error) {
                return Promise.reject({ reason: error });
            }

            return new Promise((resolve, reject) => {
                Invoice.findByIdAndUpdate(id, {
                        $set: data
                    }, { new: true },
                    (err, invoice) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(invoice);
                    });
            });
        },
        getAllInvoices(user, page, pageSize) {
            let error = validator.checkForUser(user);
            if (error) {
                return Promise.reject({ reason: error });
            }

            let skip = (page - 1) * pageSize,
                limit = pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Invoice.find({ user: user })
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

                    return resolve(invoice || null);
                });
            });
        },
        removeInvoice(id) {
            return new Promise((resolve, reject) => {
                Invoice.findByIdAndRemove(id, (err, invoice) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(invoice);
                });
            });
        },
        searchInvoicesByPlace(user, place) {
            let error = validator.checkForUser(user);
            if (error) {
                return Promise.reject({ reason: error });
            }

            return new Promise((resolve, reject) => {
                Invoice.find({ user: user, "place": place }, (err, invoice) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        },
        searchInvoicesByContragent(user, contragent) {
            let error = validator.checkForUser(user);
            if (error) {
                return Promise.reject({ reason: error });
            }

            return new Promise((resolve, reject) => {
                Invoice.find({ user: user, "client.name": contragent }, (err, invoice) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        },
        searchInvoicesByProduct(user, product) {
            let error = validator.checkForUser(user);
            if (error) {
                return Promise.reject({ reason: error });
            }

            return new Promise((resolve, reject) => {
                Invoice.find({ user: user, products: { $elemMatch: { name: product } } }, (err, invoice) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(invoice);
                });
            });
        },
        //('invoices').find({date: {$gte: ISODate("2016-12-02T00:00:00.000Z"), $lt: ISODate("2016-12-03T00:00:00.000Z")}})
        getInvoicesBetweenDates(user, startDate, endDate, page, pageSize) {
            let error = validator.checkForUser(user);
            if (error) {
                return Promise.reject({ reason: error });
            }

            let skip = (page - 1) * pageSize,
                limit = pageSize;
            return Promise.all([
                new Promise((resolve, reject) => {
                    Invoice.find({ user: user, date: { $gte: startDate, $lte: endDate } })
                        .sort({ number: "desc" })
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
        }
    };
};