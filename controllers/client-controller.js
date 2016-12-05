/* globals module */
"user strict";

module.exports = function(data) {
    return {
        name: "client",
        getClientById(req, res) {
            let id = req.params.id;
            data.getClientById(id)
                .then(invoice => {
                    res.render("client-details", {
                        model: invoice,
                        user: req.user
                    })
                });
        },
        getClientByPattern(req, res) {
            if (req.user) {
                data.getClientByPattern(req.params.pattern, req.user.username)
                    .then(clients => {
                        if (clients) {
                            res.type('jsonp');
                            res.jsonp(clients);
                        }
                    });
            } else {
                res.type('jsonp');
                res.jsonp({});
            }
        }
    };
};