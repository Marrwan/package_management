const authService = require('../../services/auth.service');
const {validatePassword} = require("../../utils/validation.utils");

const authResolvers = {
    Mutation: {
        register: async (_, { name, email, password }) => {
            validatePassword(password);
            return await authService.register({ name, email, password });
        },
        login: async (_, { email, password }) => {
            return await authService.login({ email, password });
        },
    },
};

module.exports = authResolvers;
