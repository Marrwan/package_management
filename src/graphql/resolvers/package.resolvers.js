const packageService = require("../../services/package.service");
const { Types } = require("mongoose");
const {handleAuth} = require("../../middlewares/auth.middleware");

const validateObjectId = (id, entityName = "package") => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${entityName} ID: ${id}`);
    }
};



const packageResolvers = {
    Query: {
        getPackages: async (_, { name, expirationDate, priceRange }) => {
            const filter = {};

            if (name) {
                filter.name = { $regex: name, $options: 'i' };
            }
            if (expirationDate) {
                filter.expirationDate = expirationDate;
            }
            if (priceRange) {
                filter.price = {};
                if (priceRange.min != null) filter.price.$gte = priceRange.min;
                if (priceRange.max != null) filter.price.$lte = priceRange.max;
            }

            return await packageService.getPackages(filter);
        },
        getPackageById: async (_, { id }) => {
            validateObjectId(id, "package");
            const the_package = await packageService.getPackageById(id);
            if (!the_package) {
                throw new Error(`Package with ID ${id} not found.`);
            }
            return the_package;
        },
    },
    Mutation: {
        createPackage: async (_, { name, description, price, expirationDate }, context) => {
            await handleAuth(context);

            const data = { name, description, price, expirationDate };
            return await packageService.createPackage(data);
        },
        updatePackage: async (_, { id, name, description, price }, context) => {
            await handleAuth(context, "admin");
            validateObjectId(id, "package");
            const data = { name, description, price };
            return await packageService.updatePackage(id, data);
        },
        deletePackage: async (_, { id }, context) => {
            await handleAuth(context, "admin");
            validateObjectId(id, "package");
            return await packageService.deletePackage(id);
        },
    },
};

module.exports = packageResolvers;
