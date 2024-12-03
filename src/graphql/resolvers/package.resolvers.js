const packageService = require("../../services/package.service");
const { authenticate, authorize } = require("../../middlewares/auth.middleware");

const packageResolvers = {
    Query: {
        getPackages: async (_, { expirationDate }) => {
            const filter = expirationDate ? { expirationDate } : {};
            return await packageService.getPackages(filter);
        },
        getPackageById: async (_, { id }) => {
            return await packageService.getPackageById(id);
        },
    },
    Mutation: {
        createPackage: async (_, { name, description, price, expirationDate }, context) => {
            await authenticate(context);

            const data = { name, description, price, expirationDate };
            return await packageService.createPackage(data);
        },
        updatePackage: async (_, { id, name, description, price }, context) => {
             await authenticate(context);

            await authorize("admin")(context);

            const data = { name, description, price };
            return await packageService.updatePackage(id, data);
        },
        deletePackage: async (_, { id }, context) => {
            await authenticate(context);

            authorize("admin")(context);

            return await packageService.deletePackage(id);
        },
    },
};

module.exports = packageResolvers;
