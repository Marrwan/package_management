const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {verifyToken} = require("../utils/jwt.utils");

const authenticate = async (context) => {
    const token = context.headers.authorization && context.headers.authorization.split(" ")[1];
    if (!token) {
        throw new Error("Authentication required!");
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded?.id);
        if (!user) {
            throw new Error("Invalid or expired token");
        }
        context.user = user;
        return user;
    } catch (err) {
        console.log(err)
        throw new Error("Invalid or expired token");
    }
};

const authorize = (role) => {
    return (context) => {
        const user = context.user;
        if (user.role !== role) {
            throw new Error("Forbidden: Insufficient permissions");
        }
    };
};

module.exports = { authenticate, authorize };
