/* globals module */
"user strict";

module.exports = function(data) {
    return {
        checkCompanySettings(req, res) {
            data.getCompanysettings(req.user._id)
                .then(company => {
                    if (company === null) {
                        return res.redirect("/company/create");
                    }
                    // To be changed to redirect to List of invoices for current user
                    return res.render("carousel", {
                        model: company,
                        user: req.user
                    });
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
                    res.redirect("/invoice");
                });
        }
    };
};