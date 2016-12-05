/* globals require describe it beforeEach afterEach */
"use strict";

const { expect } = require("chai"),
    sinonModule = require("sinon");

describe("Test invoices data", () => {
    let sinon;

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(props) {
            this.username = props.username;
            this.name = props.name;
            this.email = props.email;
            this.password = props.password;
        }

        save() {
            (this.username); //Useless (only for eslint correct syntax)
        }

        generateHash(pass) {
            this.username = this.username; //Useless (only for eslint correct syntax)
            return pass;
        }

        static findByIdAndUpdate() {}
        static findOne() {}
    }

    let data = require("../../data/user-data")({ User });

    describe("createUser()", () => {
        beforeEach(() => {
            sinon.stub(User.prototype, "save", cb => {
                cb(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        })

        it("Expect to save the user", done => {
            let user = {
                username: "username",
                name: "name",
                email: "email",
                password: "password"
            };

            data.createUser(user)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to fail, when username is less then 6 symbols", done => {
            let user = {
                username: "user",
                name: "name",
                email: "email",
                password: "password"
            };

            data.createUser(user)
                .catch(err => {
                    expect(err).not.to.be.null;
                    done();
                });
        });

        it("Expect to fail, when username is greater than 50 symbols", done => {
            let user = {
                username: "a".repeat(55),
                name: "name",
                email: "email",
                password: "password"
            };

            data.createUser(user)
                .catch(err => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
    });

    describe("updateUser()", () => {
        let userId = 1;

        let user = {
            _id: userId,
            username: "username",
            name: "name",
            email: "email",
            password: "password"
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findByIdAndUpdate", (id, toUpdate, isNew, cb) => {
                let newUsername = toUpdate.$set.username;
                let currentUser = users.find(us => us._id === id);
                currentUser.username = newUsername;
                cb(null, currentUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to update user", done => {
            let newUsername = "nameuser",
                newData = {
                    _id: userId,
                    username: newUsername
                };

            data.updateUser(newData)
                .then(actualUser => {
                    expect(actualUser.username).to.equal(newUsername);
                    done();
                });
        });
    });

    describe("getUserByUsername()", () => {
        let user = {
            _id: 1,
            username: "username",
            name: "name",
            email: "email",
            password: "password"
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let currentUsername = query.username;
                let currentUser = users.find(us => us.username === currentUsername);
                cb(null, currentUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            let username = "username";

            data.getUserByUsername(username)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to return null, when haven't user with current username", done => {
            let username = "wrongUsername";

            data.getUserByUsername(username)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });
    });

    describe("getUserByUsernameAndEmail()", () => {
        let user = {
            _id: 1,
            username: "username",
            name: "name",
            email: "email",
            password: "password"
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let currentUsername = query.username,
                    currentEmail = query.email;
                (currentEmail);
                let currentUser = users.find(us => us.username === currentUsername && us.email === currentEmail);
                cb(null, currentUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            let username = "username",
                email = "email";

            data.getUserByUsernameAndEmail(username, email)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to return null, when haven't user with current username", done => {
            let username = "wrongUsername",
                email = "email";

            data.getUserByUsernameAndEmail(username, email)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });

        it("Expect to return null, when hanv't user with current email", done => {
            let username = "username",
                email = "wrongEmail";

            data.getUserByUsernameAndEmail(username, email)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });
    });

    describe("getUserById()", () => {
        let user = {
            _id: 1,
            username: "username",
            name: "name",
            email: "email",
            password: "password"
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let currentId = query._id;
                let currentUser = users.find(us => us._id === currentId);
                cb(null, currentUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            let id = 1;

            data.getUserById(id)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to return null, when haven't user with current id", done => {
            let id = 100;

            data.getUserById(id)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });
    });
});