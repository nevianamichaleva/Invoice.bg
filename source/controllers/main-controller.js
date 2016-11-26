/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getHome(req, res) {
            res.render("carousel");
        },
        getAboutUs(req, res) {
            res.status(201)
                .send("<h1>About us</h1>");
        }
    };
};