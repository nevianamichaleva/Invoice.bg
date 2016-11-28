/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getHome(req, res) {
            res.render("carousel", {
                user: req.user
            });
        },
        getAboutUs(req, res) {
            res.status(201)
                .send("<h1>About us</h1>");
        },
        getUser(req, res) {
            res.render("user", {
                user: req.user
            });
        }
    };
};