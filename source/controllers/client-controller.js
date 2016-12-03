/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getClientById(req, res) {
            let id = req.params.id;
            data.getClientById(id)
                .then(invoice => {
                    res.render("client-details", {
                        model: invoice,
                        user: req.user
                    })
                })
                .catch(err => {
                    //TODO
                    console.log(err);
                })
        },
        getClientByTerm(req, res) {
            data.getClientByTerm(req.params.pattern)
            .then(clients => {
                console.log(clients);
                console.log(JSON.stringify(clients));
                if (!clients === null) {
                    res.jsonp(clients);
                }
            })
        }
    };
};
