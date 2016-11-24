/* globals module Promise */

module.exports = function(models) {
    let Company = models.Company;

    return {
        getAllCompanyes() {
            return new Promise((resolve, reject) => {
                Company.find((err, companyes) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(companyes);
                });
            });
        },
        getCompanyById(id) {
            return new Promise((resolve, reject) => {
                Company.findOne({ _id: id }, (err, company) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(company);
                });
            });
        },
        createCompany(eik, name, city, address, mol) {
            let company = new Company({
                eik,
                name,
                city,
                address,
                mol
            });

            return new Promise((resolve, reject) => {
                company.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(company);
                });
            });
        }
    };
};