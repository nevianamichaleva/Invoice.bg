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
            console.log("Here!");
            console.log(req.query["term"]);
            data.getClientByTerm(req.query["term"])
            .then(clients => {
                console.log(clients);
                if (!clients === null) {
                    return res.end(JSON.stringify(clients));
                }
            })
        }
    };
};
