/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Product } = models;
    return {
        createProduct(name, description) {
            const product = new Product({
                name,
                description
            });

            return new Promise((resolve, reject) => {
                product.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(product);
                });
            });
        },
        getAllProducts() {
            return new Promise((resolve, reject) => {
                const query = Product.find()
                    .sort({ name: "asc" });
                query.exec((err, products) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(products);
                });
            });
        },
        getProductById(id) {
            return new Promise((resolve, reject) => {
                Product.findById(id, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        }
    };
};