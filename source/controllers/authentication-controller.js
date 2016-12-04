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
            console.log(errors);
            if (req.body.username && req.body.username.toString().length < 6 ||
                    req.body.username.toString().length > 50) {
                        if (errors) {
                            errors.push({
                                param: "username",
                                msg: "Моля въведете Потребителско име между 6 и 50 символа",
                                value: ""
                            });
                        }
                        else {
                            errors = [{param: "username",
                                msg: "Моля въведете Потребителско име между 6 и 50 символа",
                                value: ""}];
                        }
                    }

            if (errors) {
                return res.render("register", {errors,
                                        model: {
                                            name: user.name,
                                            email: user.email,
                                            username: user.username }
                });
            }

            data.createUser(user)
            .then(() => {
                    res.redirect("/login");
                })
            .catch(err => {
                //TODO
                console.log(err);
            })

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