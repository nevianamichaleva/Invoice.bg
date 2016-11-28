/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getLogin(req, res) {
            res.render("login");
        },
        getRegister(req, res) {
            res.render("register");
        },
        login(req, res) {
            console.log('login : success');
            console.log(req.user);
            res.redirect("/user");
        },
        register(req, res) {
            let user = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            data.createUser(user)

            res.redirect("/company/create");
            return;
        },
        logout(req, res) {
            req.logout();
            res.redirect("/home");
        }
    }
}