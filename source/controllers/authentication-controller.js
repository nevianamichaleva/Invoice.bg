'user strict';

module.exports = function(data) {
    return {
        register(req, res) {
            let user = {
                name: req.body.name,
                username:  req.body.username,
                email:  req.body.email,
                password: req.body.password
            };

            data.createUser(user);

            res.redirect("/login");
            return;
        }
    }
}