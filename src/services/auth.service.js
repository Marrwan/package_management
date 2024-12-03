const User = require('../models/user.model');
const { hashPassword } = require('../utils/hash.utils');
const { generateToken } = require('../utils/jwt.utils');

const authService = {
    async register({ name, email, password }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use.');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = await generateToken(newUser);

        return { token, user: newUser };
    },

    async login({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        const token = user.generateToken();

        return { token, user };
    },
};

module.exports = authService;
