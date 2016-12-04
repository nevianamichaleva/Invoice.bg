/* globals module */

module.exports = {
    port: process.env.PORT || 3001,
    connectionString: {
        development: "mongodb://localhost/invoicesDb",
        production: "mongodb://admin:Tyche7@ds159747.mlab.com:59747/invoice"
    }
};