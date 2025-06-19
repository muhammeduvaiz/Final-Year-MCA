const { register, login, logout, getAllUsers, createUser, updateUser, deleteUsers } = require('./Controller/adminController')
const authAdmin = require('./Middlewares/authAdmin')
// const { getAllUsers } = require('./Controller/adminController')

const adminRouter = require('express').Router()

// Admin Authentication Routes
adminRouter.post("/register", register)
adminRouter.post("/login", login)
adminRouter.post("/logout", logout)

// Temporary test route to check vendors without auth
// adminRouter.get("/test-vendors", async (req, res) => {
//     try {
//         const vendorDb = require('../../Models/vendorModel');
//         const vendors = await vendorDb.find().select('-password -confirmpassword');
//         console.log('Test route - Found vendors:', vendors.length);
//         res.status(200).json({ count: vendors.length, vendors });
//     } catch (error) {
//         console.error('Test route error:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// User Management Routes (Protected)
adminRouter.get("/users", authAdmin, getAllUsers)
adminRouter.post("/users", authAdmin, createUser)
adminRouter.put("/users/:usersId", authAdmin, updateUser)
adminRouter.delete("/users/:usersId", authAdmin, deleteUsers)

module.exports = adminRouter