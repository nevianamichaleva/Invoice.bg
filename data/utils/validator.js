/* globals require module */
"use strict";

const constants = require("../../config/constants");

module.exports = {
    checkForUser(user) {
        if (!user) {
            return constants.wrongUserMessage;
        } else {
            return null;
        }
    },
    validateInvoice(invoice) {
        let userError = this.checkForUser(invoice.user);
        if (userError) {
            return userError;
        }

        let isValidProductNumber = invoice.number.length === constants.invoiceNumberLength;

        if (!isValidProductNumber) {
            return constants.wrongInvoiceNumberMessage;
        } else {
            return null;
        }
    },
    validateClient(client) {
        let userError = this.checkForUser(client.user);
        if (userError) {
            return userError;
        }

        let isValidIndentity = client.identity.length >= constants.minIdentityLength &&
            client.identity.length <= constants.maxIdentityLength;

        let isValidClientName = client.name.length >= constants.minClientNameLength &&
            client.name.length <= constants.maxClientNameLength;

        if (!isValidIndentity) {
            return constants.wrongIdentityMessage;
        } else if (!isValidClientName) {
            return constants.wrongClientNameMessage;
        } else {
            return null;
        }
    },
    validateCompany(company) {
        let userError = this.checkForUser(company.user);
        if (userError) {
            return userError;
        }

        let isValidBulstat = company.bulstat.length >= constants.minIdentityLength &&
            company.bulstat.length <= constants.maxIdentityLength;


        let isValidCompanyName = company.name.length >= constants.minCompanyNameLength &&
            company.name.length <= constants.maxCompanyNameLength;

        if (!isValidBulstat) {
            return constants.wrongIdentityMessage;
        } else if (!isValidCompanyName) {
            return constants.wrongCompanyNameMessage;
        } else {
            return null;
        }
    },
    validateProduct(product) {
        let userError = this.checkForUser(product.user);
        if (userError) {
            return userError;
        }

        let isValidProductName = product.name.length >= constants.minProductNameLength &&
            product.name.length <= constants.maxProductNameLength;

        if (!isValidProductName) {
            return constants.wrongProductNameMessage;
        } else {
            return null;
        }
    },
    validateUser(userData) {
        let isValidUsername = userData.username.length >= constants.minUsernameLength &&
            userData.username.length <= constants.maxUsernameLength;

        if (!isValidUsername) {
            return constants.wrongUsernameMessage;
        } else {
            return null;
        }
    }
};