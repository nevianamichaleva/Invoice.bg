/* globals require module Promise*/
"use strict";

module.exports = function(models) {
    let { CompanySettings } = models;
    return {
        createCompanySettings(data) {
            const companysettings = new CompanySettings({
                name: data.name,
                identity: data.identity,
                useTax: data.useTax,
                address: data.address,
                email: data.email,
                accountablePerson: data.accountablePerson,
                phone: data.phone,
                logo: data.logo,
                user: data.user
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
                CompanySettings.findByIdAndUpdate(id, {
                    $set: {
                        name: data.name,
                        identity: data.identity,
                        useTax: data.useTax,
                        address: data.address,
                        email: data.email,
                        accountablePerson: data.accountablePerson,
                        phone: data.phone,
                        logo: data.logo
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