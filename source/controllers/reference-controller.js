/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getReference(req, res) {
            res.render("reference", {
                user: req.user
            });
        },
        getPlace(req, res) {
            let place = req.query.place;
            let user = req.user.username;
            //console.log(user);
            data.searchInvoicesByPlace(user, place)
                .then(invoice => {
                    res.render("invoice-listplace", {
                        model: invoice,
                        user: req.user
                    })
                })
                .catch(err => {
                    //TODO
                    console.log(err);
                })
        },
        getContragent(req, res) {
            let contragent = req.query.contragent;
            let user = req.user.username;
            //console.log(contragent, user);
            data.searchInvoicesByContragent(user, contragent)
                .then(invoice => {
                    res.render("invoice-listplace", {
                        model: invoice,
                        user: req.user
                    })
                })
                .catch(err => {
                    //TODO
                    console.log(err);
                })
        }
    }
}