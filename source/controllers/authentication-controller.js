/* globals module crypto*/
"user strict";

const CryptoJS = require("crypto-js");

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
            let encryptPassword = CryptoJS.AES.encrypt(req.body.password, 'pass');

            let user = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password //encryptPassword
            };

            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Please add a valid email').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();

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