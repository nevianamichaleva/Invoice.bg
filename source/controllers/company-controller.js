/* globals module */
"user strict";
var fs = require("fs");

module.exports = function(data) {
    return {
        checkCompanySettings(req, res) {
            if (!req.user) {
                return res.redirect("/login");
            }
            data.getCompanysettings(req.user._id)
                .then(company => {
                    if (company === null) {
                        return res.redirect("/company/create");
                    }
                    return res.redirect("/invoice/all");
                });
        },
        getBlankCompanySettings(req, res) {
            if (!req.user) {
                return res.redirect("/login");
            }
            res.render("company-details", {
                user: req.user
            });
        },
        getCompanySettings(req, res) {
            if (!req.user) {
                return res.redirect("/login");
            }
            data.getCompanysettings(req.user._id)
                .then(company => {
                    if (company === null) {
                        return res.status(404)
                            .redirect("/company/create");
                    }
                    return res.render("company-details", {
                        model: company,
                        user: req.user
                    });
                });
        },
        createCompanySettings(req, res) {
            if (!req.user) {
                return res.redirect("/login");
            }
            let companysettings = {
                name: req.body.name,
                bulstat: req.body.bulstat,
                useTax: req.body.useTax,
                city: req.body.city,
                address: req.body.address,
                accountablePerson: req.body.accountablePerson,
                email: req.body.email,
                phone: req.body.phone,
                user: req.user._id,
                logo: req.file
            };

            req.checkBody('name', 'Моля въведете Име на фирма').notEmpty();
            req.checkBody('bulstat', 'Моля въведете ЕИК').notEmpty();
            req.checkBody('city', 'Моля въведете град').notEmpty();
            req.checkBody('address', 'Моля въведете адрес').notEmpty();
            req.checkBody('accountablePerson', 'Моля въведете име на МОЛ').notEmpty();
            req.checkBody('email', 'Моля въведете валиден Email').isEmail();

            var errors = req.validationErrors();
            if (req.body.name && req.body.name.toString().length < 2 ||
                    req.body.name.toString().length > 50) {
                        var tmpError = {
                                param: "name",
                                msg: "Моля въведете Име на фирма между 2 и 50 символа",
                                value: ""
                            };
                        if (errors) {
                            errors.push(tmpError);
                        }
                        else {
                            errors = [tmpError];
                        }
                    }
            if (req.body.bulstat && req.body.bulstat.toString().length < 9 ||
                    req.body.bulstat.toString().length > 13) {
                        var tmpError1 = {
                                param: "bulstat",
                                msg: "Моля въведете ЕИК между 9 и 13 символа",
                                value: ""
                            }
                        if (errors) {
                            errors.push(tmpError1);
                        }
                        else {
                            errors = [tmpError1];
                        }
                    }
            if (errors) {
                return res.render("company-details", {errors,
                                        model: companysettings });
            }

            data.createCompanySettings(companysettings)
                .then(() => {
                    if (req.file != undefined) {
                        fs.unlink('../source/' + req.file.path, function(err) {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                    return res.redirect("/invoice");
                });
        },
        changeCompanySettings(req, res) {
            if (!req.user) {
                return res.redirect("/login");
            }
            let companysettings = {
                name: req.body.name,
                bulstat: req.body.bulstat,
                useTax: req.body.useTax,
                city: req.body.city,
                address: req.body.address,
                accountablePerson: req.body.accountablePerson,
                email: req.body.email,
                phone: req.body.phone,
                logo: req.file
            };
            data.updateCompanysettings(req.body._id, companysettings)
                .then(() => {
                    if (req.file != undefined) {
                        fs.unlink('../source/' + req.file.path, function(err) {
                            if (err) {
                                return console.error(err);
                            }
                        });
                    }
                    return res.redirect("/invoice");
                });
        }
    };
};