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
            //console.log(req.query);
            data.searchInvoices(place)
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