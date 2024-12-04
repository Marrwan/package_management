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
        const updatedPackage = await Package.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPackage) {
            throw new Error(`No package with ID ${id} found for update.`);
        }
        return updatedPackage;
    },

    async deletePackage(id) {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            throw new Error(`No package with ID ${id} found for deletion.`);
        }
        return deletedPackage;
    },

    async getPackageById(id) {
        return await Package.findById(id);
    },
};

module.exports = packageService;
