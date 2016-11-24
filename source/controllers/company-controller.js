module.exports = function(data) {
    return {
        getAll(req, res) {
            data.getAllCompanyes()
                .then(companyes => {
                    res.render("companyes-list", {
                        result: companyes
                    });
                });
        },
        getById(req, res) {
            data.getCompanyesById(req.params.id)
                .then(company => {
                    if (company === null) {
                        return res.status(404)
                            .redirect("/error");
                    }

                    return res.render("companyes-details", {
                        result: company
                    });
                });
        },
        create(req, res) {
            let body = req.body;
            data.createCompany(body.eik, body.name, body.city, body.address, body.mol)
                .then(() => {
                    res.redirect("/companyes");
                });
        }
    };
};