"user strict";

module.exports = function (data) {
    return {
        getLogin(req, res) {
            res.render("login");
        },
        getRegister(req, res) {
            res.render("register");
        },
        login(req, res) {
            /*res.json({
                success: true,
                msg: "You are logged."
            });*/  
            res.redirect("/company");
        },
        register(req, res) {

            let user = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Please add a valid email').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();

            data.createUser(user)

            /*res.json({
                success: true,
                msg: "The user is created."
            });*/

            res.redirect("/login");
            return;
        },
        logout(req, res) {
            req.logout();
            res.redirect("/home");
        }
    }
}