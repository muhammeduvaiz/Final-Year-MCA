const jwt = require('jsonwebtoken');
const userDb = require('../Models/userModels');

const authUsers = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userDb.findById(decoded.id).select('-password -confirmpassword');

        if (!user) {
            return res.status(401).json({ error: "Invalid token." });
        }

        if (!user.isActive || user.isDeleted) {
            return res.status(401).json({ error: "Account is deactivated or deleted." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = authUsers; 