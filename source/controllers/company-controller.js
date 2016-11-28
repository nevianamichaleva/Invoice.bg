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
            res.render("company-details", {
                user: req.user
            });
        },
        createCompany(req, res) {
            let companysettings = {
                name: req.body.name,
                bulstat: req.body.bulstat,
                city: req.body.city,
                address: req.body.address,
                accountablePerson: req.body.accountablePerson,
                email: req.body.email,
                phone: req.body.phone,
                user: {
                    userId: req.user.id,
                    user: req.user.username
                }
            };
            data.createCompanysettings(companysettings)
                .then(() => {
                    //console.log(companysettings.name);
                    res.redirect("/invoice");
                });
        },
        companySettings(req, res) {
            res.send("<h1>Company settings changed");
        }
    };
};