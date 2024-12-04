const authService = require('../../services/auth.service');
const {validatePassword} = require("../../utils/validation.utils");
const {Types} = require("mongoose");
const {handleAuth} = require("../../middlewares/auth.middleware");

const authResolvers = {
    Mutation: {
        register: async (_, { name, email, password }) => {
            validatePassword(password);
            return await authService.register({ name, email, password });
        },
        login: async (_, { email, password }) => {
            return await authService.login({ email, password });
        },
        switchRole : async (_, { userId, newRole }, context) => {
            await handleAuth(context);
            const loggedInUser = context.user;

            if (!userId) {
                userId = loggedInUser.id;
            }


            if (!Types.ObjectId.isValid(userId)) {
                throw new Error(`Invalid user ID: ${userId}`);
            }

            const validRoles = ["admin", "user"];
            if (!validRoles.includes(newRole)) {
                throw new Error(`Invalid role: ${newRole}`);
            }

            return await authService.switchRole({userId, newRole})

        }
    },
};

module.exports = authResolvers;
