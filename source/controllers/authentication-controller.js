"user strict";

module.exports = function(data) {
    return {
        name: "authentication",
        getLogin(req, res) {
            res.render("login", { message: req.flash('signupMessage') });
        },
        getRegister(req, res) {
            res.render("register");
        },
        login(req, res) {
            res.redirect("/company");
        },
        register(req, res) {

            let user = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            req.checkBody('name', 'Моля въведете Име, фамилия').notEmpty();
            req.checkBody('username', 'Моля въведете Потребителско име').notEmpty();
            req.checkBody('email', 'Моля въведете Email').notEmpty();
            req.checkBody('email', 'Моля въведете валиден Email').isEmail();
            req.checkBody('password', 'Моля въведете парола').notEmpty();
            req.checkBody('confirm', 'Моля потвърдете паролата').notEmpty();

            var errors = req.validationErrors();
            if (errors) {
                res.render('register', { errors: errors });
                return;
            }

            data.createUser(user)

            res.redirect("/login");
            return;
        },
        logout(req, res) {
            req.logout();
            res.redirect("/home");
        },
        facebookRegister(req, res) {
            res.redirect("/company");
        }
    }
}