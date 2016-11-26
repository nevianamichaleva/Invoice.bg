/* globals module */
"user strict";

module.exports = function(data) {
    return {
        getProfile(req, res) {
            res.send("<h1>Profil page</h1>");
        },
        getUserSettings(req, res) {
            res.send("<h1>User Settings</h1>");
        },
        changeUserSettings(req, res) {
            res.send("<h1> Changed user settings");
        }
    }
}