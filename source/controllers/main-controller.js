module.exports = function() {
    return {
        getMain(req, res) {
            res.render("carousel");
        },
        getLogin(req, res) {
            res.render("login");
        },
        getRegister(req, res) {
            res.render("register");
        }
    };
};