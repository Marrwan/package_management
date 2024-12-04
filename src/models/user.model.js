const mongoose = require('mongoose');
const { generateToken } = require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/hash.utils');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);

userSchema.methods.hashPassword = hashPassword;
userSchema.methods.comparePassword = function (password){
    return comparePassword(password, this.password);
};
userSchema.methods.generateToken = function () {
    return generateToken(this);
};

module.exports = mongoose.model('User', userSchema);
