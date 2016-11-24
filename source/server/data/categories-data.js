/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { Category } = models;
    return {
        createCategory(name, ...products) {
            if (Array.isArray(products[0])) {
                products = products[0];
            }

            const category = new Category({
                name,
                products
            });

            return new Promise((resolve, reject) => {
                category.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        },
        getAllCategories() {
            return new Promise((resolve, reject) => {
                const query = Category.find()
                    .sort({ name: "asc" });

                query.exec((err, categories) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(categories);
                });
            });
        },
        getCategoryById(id) {
            return new Promise((resolve, reject) => {
                Category.findById(id, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        }
    };
};