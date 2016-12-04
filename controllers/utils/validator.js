/* globals require module */
"use strict";

const constants = require("../../config/constants");

module.exports = {
    validateRegister(req) {
        req.checkBody('name', constants.emptyNameMessage).notEmpty();
        req.checkBody('username', constants.emptyUsernameMessage).notEmpty();
        req.checkBody('email', constants.emptyEmailMessage).notEmpty();
        req.checkBody('email', constants.wrongEmailMessage).isEmail();
        req.checkBody('password', constants.emptyPasswordMessage).notEmpty();
        req.checkBody('confirm', constants.emptyConfirmMessage).notEmpty();

        var errors = req.validationErrors();

        if (req.body.username && !this.checkUsername(req.body.username)) {
            var tmpError = {
                param: "username",
                msg: constants.wrongUsernameMessage,
                value: ""
            };
            if (errors) {
                errors.push(tmpError);
            } else {
                errors = [tmpError];
            }
        }
        return errors;
    },
    validateCompany(req) {
        req.checkBody('name', constants.emptyCompanyNameMessage).notEmpty();
        req.checkBody('bulstat', constants.emptyIdentityMessage).notEmpty();
        req.checkBody('city', constants.emptyCityMessage).notEmpty();
        req.checkBody('address', constants.emptyAddressMessage).notEmpty();
        req.checkBody('accountablePerson', constants.emptyMOLMessage).notEmpty();
        req.checkBody('email', constants.wrongEmailMessage).isEmail();

        var errors = req.validationErrors();
        if (req.body.name && !this.checkCompanyName(req.body.name)) {
            var tmpError = {
                param: "name",
                msg: constants.wrongCompanyNameMessage,
                value: ""
            };
            if (errors) {
                errors.push(tmpError);
            } else {
                errors = [tmpError];
            }
        }
        if (req.body.bulstat && !this.checkIdentity(req.body.bulstat)) {
            var tmpError1 = {
                param: "bulstat",
                msg: constants.wrongIdentityMessage,
                value: ""
            }
            if (errors) {
                errors.push(tmpError1);
            } else {
                errors = [tmpError1];
            }
        }
        return errors;
    },
    checkInvoiceNumber(number) {
        return number.length === constants.invoiceNumberLength;
    },
    checkIdentity(identity) {
        return identity.length >= constants.minIdentityLength &&
            identity.length <= constants.maxIdentityLength;
    },
    checkCompanyName(companyName) {
        return companyName.length >= constants.minCompanyNameLength &&
            companyName.length <= constants.maxCompanyNameLength;
    },
    checkClientName(clientName) {
        return clientName.length >= constants.minClientNameLength &&
            clientName.length <= constants.maxClientNameLength;
    },
    checkProductNameLength(productName) {
        return productName.length >= constants.minProductNameLength &&
            productName.length <= constants.maxProductNameLength;
    },
    checkUsername(username) {
        return username.length >= constants.minUsernameLength &&
            username.length <= constants.maxUsernameLength;
    }
};