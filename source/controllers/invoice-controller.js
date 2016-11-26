/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getInvoice(req, res) {
            res.render("invoice");
        }
    };
};