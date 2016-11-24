/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { CompanySettings } = models;
    return {
        createCompanySettings(name, identity, useTax, address, email, accountablePerson, phone, logo) {
            const companysettings = new CompanySettings({
                name,
                identity,
                useTax,
                address,
                email,
                accountablePerson,
                phone,
                logo
            });

            return new Promise((resolve, reject) => {
                companysettings.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(companysettings);
                });
            });
        },
        getCompanysettings() {
            return new Promise((resolve, reject) => {
                CompanySettings.find((err, companysettings) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(companysettings);
                });
            });
        },
        updateCompanysettings(id, name, identity, useTax, address, email, accountablePerson, phone, logo) {
            return new Promise((resolve, reject) => {
                CompanySettings.findByIdAndUpdate(id, {
                    $set: {
                        name,
                        identity,
                        useTax,
                        address,
                        email,
                        accountablePerson,
                        phone,
                        logo
                    }
                },
                { new: true },
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