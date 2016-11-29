/* globals require module Promise*/
"use strict";

const fs = require("fs");

module.exports = function(models) {
    let { CompanySettings } = models;
    return {
        createCompanySettings(data) {
            const companysettings = new CompanySettings({
                name: data.name,
                bulstat: data.bulstat,
                useTax: data.useTax,
                city: data.city,
                address: data.address,
                email: data.email,
                accountablePerson: data.accountablePerson,
                phone: data.phone,
                logo: data.logo,
                user: data.user
            });

            return new Promise((resolve, reject) => {
                companysettings.save(err => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(companysettings);
                });
            });
        },
        getCompanysettings(user) {
            return new Promise((resolve, reject) => {
                CompanySettings.findOne({ user }, (err, companysettings) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(companysettings);
                });
            });
        },
        updateCompanysettings(id, data) {
            return new Promise((resolve, reject) => {
                //console.log(data.logo);
                let logoImage = {
                    data: fs.readFileSync(data.logo.path),
                    contentType: 'image/png'
                };
                CompanySettings.findByIdAndUpdate(id, {
                        $set: {
                            name: data.name,
                            bulstat: data.bulstat,
                            useTax: data.useTax,
                            city: data.city,
                            address: data.address,
                            email: data.email,
                            accountablePerson: data.accountablePerson,
                            phone: data.phone,
                            logo: logoImage
                        }
                    }, { new: true },
                    (err, companysettings) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(companysettings);
                    });
            });
        }
    };
};