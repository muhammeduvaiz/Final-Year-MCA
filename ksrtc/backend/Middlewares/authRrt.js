const jwt = require('jsonwebtoken');
const rrtUserModel = require('../Models/rrtUserModel');

const authRrt = async (req, res, next) => {
    try {
        // Get token from cookie or header
        const token = req.cookies.rrtToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');

        // Check if user exists and is active
        const rrtUser = await rrtUserModel.findById(decoded.userId)
            .select('-password -confirmpassword');

        if (!rrtUser || rrtUser.isDeleted || !rrtUser.isActive) {
            return res.status(401).json({ error: 'Invalid token. User not found or inactive.' });
        }

        // Add user info to request
        req.user = decoded;
        req.rrtUser = rrtUser;
        next();

    } catch (error) {
        console.error('RRT auth middleware error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        res.status(500).json({ error: 'Authentication failed.' });
    }
};

module.exports = authRrt; 