const adminDb=require('../Models/adminModels');
const userDb=require('../Models/userModels');
const { hashPassword } = require('../Utilities/passwordUtilities');
const { createToken } = require('../Utilities/generateToken');
const { comparePassword } = require('../Utilities/passwordUtilities');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const alreadyExist = await adminDb.findOne({ email });
        if (alreadyExist) {
            return res.status(400).json({

                message: "Admin already exists"
            })
        }
        const hashedPassword = await hashPassword(password)
        const newAdmin = new  adminDb({
            email,password:hashedPassword
        })
        const saved = await newAdmin.save()

        if(saved){
            return res.status(200).json({message:"Admin created",saved})
        }

    } catch (error) {
        res.status(500).json({

            message: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const adminExist = await adminDb.findOne({ email })
        if (!adminExist) {
            return res.status(400).json({ error: "admin Not found" })
        }

        const passwordMatch = await comparePassword(password, adminExist.password)
        if (!passwordMatch) {
            return res.status(400).json({ error: "Passwords does not match" })
        }
        const token = createToken(adminExist._id,"admin")
        
        // Set cookie with more compatible settings for development
        res.cookie("Admin_token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        return res.status(200).json({ message: "admin login successfull", adminExist })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const logout= async(req,res)=>{
    try {

        res.clearCookie("Admin_token", { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });
        return res.status(200).json({ message: "Logout successful" })
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
        
    }
}

// Get All Users (Admin)
const getAllUsers = async (req, res) => {
    try {
        console.log('getAllUsers called by admin:', req.admin);
        const users = await userDb.find().select('-password -confirmpassword');
        console.log('Found users:', users.length);
        console.log('Users data:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create New User (Admin)
const createUser = async (req, res) => {
    try {
        const { name, username, phone, password, confirmpassword, age, gender } = req.body;
        
        if (!name || !username || !phone || !password || !confirmpassword) {
            return res.status(400).json({ error: "All required fields are required" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const userExist = await userDb.findOne({ username });
        if (userExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new userDb({
            name, 
            username, 
            phone, 
            password: hashedPassword, 
            confirmpassword: hashedPassword,
            age,
            gender
        });

        const saved = await newUser.save();
        if (saved) {
            return res.status(201).json({ 
                message: "User created successfully",
                user: {
                    _id: saved._id,
                    name: saved.name,
                    username: saved.username,
                    phone: saved.phone,
                    age: saved.age,
                    gender: saved.gender
                }
            });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

// Update User (Admin)
const updateUser = async (req, res) => {
    try {
        const { usersId } = req.params;
        const { name, username, phone, password, confirmpassword, age, gender } = req.body;

        const user = await userDb.findById(usersId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if username is being changed and if it already exists
        if (username && username !== user.username) {
            const usernameExists = await userDb.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ error: "Username already exists" });
            }
        }

        // Update fields
        const updateData = {
            name: name || user.name,
            username: username || user.username,
            phone: phone || user.phone,
            age: age || user.age,
            gender: gender || user.gender
        };

        // Only update password if provided and passwords match
        if (password && confirmpassword) {
            if (password !== confirmpassword) {
                return res.status(400).json({ error: "Passwords do not match" });
            }
            const hashedPassword = await hashPassword(password);
            updateData.password = hashedPassword;
            updateData.confirmpassword = hashedPassword;
        }

        const updatedUser = await userDb.findByIdAndUpdate(
            usersId,
            updateData,
            { new: true }
        ).select('-password -confirmpassword');

        res.status(200).json({ 
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

// Delete User (Admin)
const deleteUsers = async (req, res) => {
    try {
        const { usersId } = req.params;
        
        const users = await userDb.findById(usersId);
        if (!users) {
            return res.status(404).json({ message: "user not found" });
        }

        await userDb.findByIdAndDelete(usersId);

        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={
    register,
    login,
    logout,
    getAllUsers,
    createUser,
    updateUser,
    deleteUsers
}