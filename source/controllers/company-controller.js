/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getCompany(req, res) {
            // data.getCompanyesById(req.params.id)
            //     .then(company => {
            //         if (company === null) {
            //             return res.status(404)
            //                 .redirect("/error");
            //         }

            //         return res.render("companyes-details", {
            //             result: company
            //         });
            //     });
            res.send("<h1>User Company</h1>");
        },
        getCreateCompany(req, res) {
            res.send("<h1> Company settings </h1>");
        },
        getCompanySettings(req, res) {
            res.render("company-details");
        },
        createCompany(req, res) {
            let companysettings = {
                name: req.body.name,
                bulstat: req.body.bulstat,
                city: req.body.city,
                address: req.body.address,
                accountablePerson: req.body.accountablePerson,
                email: req.body.email,
                phone: req.body.phone
            };
            data.createCompanysettings(companysettings)
                .then(() => {
                    res.redirect("/invoice");
                });
        },
        companySettings(req, res) {
            res.send("<h1>Company settings changed");
        }
    };
};