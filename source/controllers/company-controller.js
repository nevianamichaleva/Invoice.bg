/* globals module */
"user strict";
var fs = require("fs");

module.exports = function(data) {
    return {
        checkCompanySettings(req, res) {
            data.getCompanysettings(req.user._id)
                .then(company => {
                    if (company === null) {
                        return res.redirect("/company/create");
                    }
                    return res.redirect("/invoice/all");
                });
        },
        getBlankCompanySettings(req, res) {
            res.render("company-details", {
                user: req.user
            });
        },
        getCompanySettings(req, res) {
            data.getCompanysettings(req.user._id)
                .then(company => {
                    if (company === null) {
                        return res.status(404)
                            .redirect("/error");
                    }
                    return res.render("company-details", {
                        model: company,
                        user: req.user
                    });
                });
        },
        createCompanySettings(req, res) {
            //console.log(req.user);
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
            data.createCompanySettings(companysettings)
                .then(() => {
                    //console.log("File to delete: "+ req.file);
                    fs.unlink('../source/' + req.file.path, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        //console.log("File deleted successfully!");
                    });
                    res.redirect("/invoice");
                });
        },
        changeCompanySettings(req, res) {
            //console.log(req.file);
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
                    //console.log("Going to delete an existing file");
                    fs.unlink('../source/' + req.file.path, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        //console.log("File deleted successfully!");
                    });
                    res.redirect("/invoice");
                });
        }
    };
};