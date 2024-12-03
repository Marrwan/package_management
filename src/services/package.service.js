const Package = require('../models/package.model');

const packageService = {
    async getPackages(filters) {
        return await Package.find(filters);
    },

    async createPackage(data) {
        const newPackage = new Package(data);
        return await newPackage.save();
    },

    async updatePackage(id, data) {
        return await Package.findByIdAndUpdate(id, data, { new: true });
    },

    async deletePackage(id) {
        return await Package.findByIdAndDelete(id);
    },

    async getPackageById(id) {
        return await Package.findById(id);
    },
};

module.exports = packageService;
