const rrtUserModel = require('../Models/rrtUserModel');
const jwt = require('jsonwebtoken');

// RRT Login
const rrtLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide username and password' });
        }

        // Find RRT user by username
        const rrtUser = await rrtUserModel.findOne({ 
            username: username.toLowerCase(),
            isDeleted: false,
            isActive: true
        });

        if (!rrtUser) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await rrtUser.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        rrtUser.lastLogin = new Date();
        await rrtUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: rrtUser._id, 
                username: rrtUser.username,
                role: 'rrt'
            },
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '24h' }
        );

        // Set cookie
        res.cookie('rrtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Return user info (without password)
        const userResponse = rrtUser.getPublicProfile();

        res.status(200).json({
            message: 'RRT login successful',
            user: userResponse,
            token: token
        });

    } catch (error) {
        console.error('RRT login error:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
};

// RRT Logout
const rrtLogout = async (req, res) => {
    try {
        res.clearCookie('rrtToken');
        res.status(200).json({ message: 'RRT logged out successfully' });
    } catch (error) {
        console.error('RRT logout error:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
};

// Get current RRT user
const getCurrentRrtUser = async (req, res) => {
    try {
        const rrtUser = await rrtUserModel.findById(req.user.userId)
            .select('-password -confirmpassword');

        if (!rrtUser || rrtUser.isDeleted || !rrtUser.isActive) {
            return res.status(404).json({ error: 'RRT user not found' });
        }

        res.status(200).json({ user: rrtUser });
    } catch (error) {
        console.error('Get current RRT user error:', error);
        res.status(500).json({ error: 'Failed to get user information' });
    }
};

module.exports = {
    rrtLogin,
    rrtLogout,
    getCurrentRrtUser
}; 