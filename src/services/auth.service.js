const User = require('../models/user.model');
const { hashPassword } = require('../utils/hash.utils');
const { generateToken } = require('../utils/jwt.utils');

const authService = {
    async register({ name, email, password }) {
        try {
            const existingUser = await User.findOne({email});
            if (existingUser) {
                throw new Error('Email already in use.');
            }

            const hashedPassword = await hashPassword(password);
            const newUser = new User({name, email, password: hashedPassword});
            await newUser.save();

            const access_token = await generateToken(newUser);

            return {access_token, user: newUser};
        }catch(err) {
            throw new Error("Something went wrong, please try again later.");
        }
    },

    async login({ email, password }) {
        try {
            const user = await User.findOne({email});
            if (!user) {
                throw new Error('User not found.');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid credentials.');
            }

            const access_token = user.generateToken();

            return {access_token, user};
        }catch (e) {
            console.error({e});
            throw new Error("Something went wrong, please try again later.");
        }
    },

    async switchRole({userId, newRole}){
            const user = await User.findById(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            if (user.role === newRole) {
                return user;
            }

            user.role = newRole;
            await user.save();
            return user;
    }
};

module.exports = authService;
