const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        secret,
        { expiresIn: '1d' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
