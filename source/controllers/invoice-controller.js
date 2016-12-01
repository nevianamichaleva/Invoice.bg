/* globals module */
"user strict";

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10

module.exports = function(data) {
    return {
        getInvoice(req, res) {
            if (req.user) {
                data.getCompanysettings(req.user._id)
                    .then(company => {
                        if (company === null) {
                            return res.redirect("/company/create");
                        }
                        console.log(company.identity);
                        return res.render("invoice", {
                            model: company,
                            user: req.user
                        });
                    });
            } else {
                res.render("invoice");
            }
        },
        getAllInvoices(req, res) {
            let user = req.user.username;
            let page = Number(req.query.page || DEFAULT_PAGE);

            data.getAllInvoices(user, page, PAGE_SIZE)
                .then((result => {
                    let {
                        invoices,
                        count
                    } = result;

                    if (count === 0) {
                        return res.render("invoice-list", {
                            model: invoices,
                            user,
                            params: { page, pages: 0 }
                        });
                    }

                    if (page < 1) {
                        return res.redirect("/invoice/all?page=1");
                    }

                    let pages = count / PAGE_SIZE;
                    if (parseInt(pages, 10) < pages) {
                        pages += 1;
                        pages = parseInt(pages, 10);
                    }
                    if (page > pages) {
                        page = pages;
                        return res.redirect(`/invoice/all?page=${page}`);
                    }
                    return res.render("invoice-list", {
                        model: invoices,
                        user: req.user,
                        params: { page, pages }
                    });
                }))
                .catch(err => {
                    //TODO
                    console.log(err);
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
                    console.log(err);
                })
        },
        createInvoice(req, res) {
            let user = "author" || req.user.username,
                invoice = req.body;

            invoice.user = user;

            data.createInvoice(invoice)
                .then(() => {
                    //TODO
                    console.log("done");
                })
                .catch(err => {
                    //TODO
                    console.log(err);
                });
        }
    };
};