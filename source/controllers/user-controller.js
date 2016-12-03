/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getProfile(req, res) {
            res.render("profile", {
                model: req.user,
                user: req.user
            });
        },
        changeProfile(req, res) {
            let userdata = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                _id: req.user._id
            };
            data.updateUser(userdata)
                .then(() => {
                    res.redirect("/home", {
                        user: req.user
                    });
                });
        },
        getUserSettings(req, res) {
            res.send("<h1>User Settings</h1>");
        },
        changeUserSettings(req, res) {
            res.send("<h1> Changed user settings");
        }
    }
}