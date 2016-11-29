/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getInvoice(req, res) {
            if (req.user) {
                data.getCompanysettings(req.user._id)
                    .then(company => {
                        if (company === null) {
                            return res.redirect("/company/create");
                        }
                        // To be changed to redirect to List of invoices for current user
                        return res.render("invoice", {
                            model: company,
                            user: req.user
                        });
                    });
            } else {
                res.redirect("/invoice/unregistered");
            }
        },
        getUnregisteredInvoice(req, res) {
            res.render("invoice-unregistered");
        },
        getAllInvoices(req, res) {
            let user = req.user.username;
            data.getAllInvoices(user)
                .then(invoices => {
                    res.render("invoices-list", {
                        model: invoices,
                        user: req.user
                    })
                })
                .catch(err => {
                    //TODO
                });
        },
        getInvoiceById(req, res) {
            let id = req.params.id;
            data.getInvoiceById(id)
                .then(invoice => {
                    res.render("user-invoice", {
                        model: invoice,
                        user: req.user
                    })
                })
                .catch(err => {
                    //TODO
                })
        },
        createInvoice(req, res) {
            let user = req.user.username;
            let { companyName, companyAddress, companyIdentity, companyMOL, number, date, clientName, clientAddress, clientIdentity, clientMOL, sum, vat } = req.body;
            let company = {
                name: companyName,
                identity: companyIdentity,
                address: companyAddress,
                accountablePerson: companyMOL
            };

            let client = {
                name: clientName,
                identity: clientIdentity,
                address: clientAddress,
                accountablePerson: clientMOL
            };

            let invoiceData = {
                number,
                date,
                company,
                client,
                sum,
                vat,
                user
            }

            data.createInvoice(invoiceData)
                .then(invoice => {
                    console.log(invoice);
                })
                .catch(err => {
                    console.log(err);
                });
            //TODO
        }
    };
};