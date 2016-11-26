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
            res.send("<h1>Create Company form</h1>");
        },
        getCompanySettings(req, res) {
            res.send("<h1>Company settings</h1>");
        },
        createCompany(req, res) {
            let body = req.body;
            data.createCompany(body.eik, body.name, body.city, body.address, body.mol)
                .then(() => {
                    res.redirect("/company");
                });
        },
        companySettings(req, res) {
            res.send("<h1>Company settings changed");
        }
    };
};