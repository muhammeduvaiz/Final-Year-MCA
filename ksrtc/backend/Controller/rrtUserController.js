const rrtUserModel = require('../Models/rrtUserModel');
const bcrypt = require('bcryptjs');

// Get all RRT users
const getAllRrtUsers = async (req, res) => {
    try {
        const users = await rrtUserModel.find()
            .select('-password -confirmpassword')
            .sort({ createdAt: -1 });
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching RRT users:', error);
        res.status(500).json({ error: 'Failed to fetch RRT users' });
    }
};

// Create new RRT user
const createRrtUser = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            phone,
            password,
            confirmpassword
        } = req.body;

        // Validation
        if (!name || !username || !email || !phone || !password || !confirmpassword) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if username or email already exists
        const existingUser = await rrtUserModel.findOne({
            $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new user
        const newUser = new rrtUserModel({
            name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            phone,
            password,
            confirmpassword
        });

        const savedUser = await newUser.save();
        const userResponse = savedUser.getPublicProfile();

        res.status(201).json({
            message: 'RRT user created successfully',
            user: userResponse
        });
    } catch (error) {
        console.error('Error creating RRT user:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: 'Failed to create RRT user' });
    }
};

// Update RRT user
const updateRrtUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        
        console.log('Update RRT user request:', { userId, updateData });

        // Handle password update
        if (updateData.password && updateData.confirmpassword) {
            // Validate password
            if (updateData.password !== updateData.confirmpassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
            if (updateData.password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters long' });
            }
            
            // Hash the password
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
            updateData.confirmpassword = updateData.password; // Set confirmpassword to hashed password
        } else {
            // Remove password fields if not being updated
            delete updateData.password;
            delete updateData.confirmpassword;
        }

        // Check if user exists
        const existingUser = await rrtUserModel.findById(userId);
        console.log('Existing user found:', !!existingUser);
        if (!existingUser) {
            return res.status(404).json({ error: 'RRT user not found' });
        }

        // Check for username/email conflicts if being updated
        if (updateData.username || updateData.email) {
            const conflictQuery = {
                _id: { $ne: userId },
                $or: []
            };

            if (updateData.username) {
                conflictQuery.$or.push({ username: updateData.username.toLowerCase() });
            }
            if (updateData.email) {
                conflictQuery.$or.push({ email: updateData.email.toLowerCase() });
            }

            const conflictUser = await rrtUserModel.findOne(conflictQuery);
            if (conflictUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
        }

        // Update user
        const updatedUser = await rrtUserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -confirmpassword');

        console.log('User updated successfully:', updatedUser);

        res.status(200).json({
            message: 'RRT user updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating RRT user:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: 'Failed to update RRT user' });
    }
};

// Delete RRT user (hard delete)
const deleteRrtUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log('Delete RRT user request:', { userId });

        const user = await rrtUserModel.findById(userId);
        console.log('User found for deletion:', !!user);
        if (!user) {
            return res.status(404).json({ error: 'RRT user not found' });
        }

        // Hard delete - completely remove from database
        await rrtUserModel.findByIdAndDelete(userId);
        
        console.log('User deleted successfully');

        res.status(200).json({ message: 'RRT user deleted successfully' });
    } catch (error) {
        console.error('Error deleting RRT user:', error);
        res.status(500).json({ error: 'Failed to delete RRT user' });
    }
};

// Get RRT user by ID
const getRrtUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await rrtUserModel.findById(userId)
            .select('-password -confirmpassword');

        if (!user) {
            return res.status(404).json({ error: 'RRT user not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching RRT user:', error);
        res.status(500).json({ error: 'Failed to fetch RRT user' });
    }
};

module.exports = {
    getAllRrtUsers,
    createRrtUser,
    updateRrtUser,
    deleteRrtUser,
    getRrtUserById
};