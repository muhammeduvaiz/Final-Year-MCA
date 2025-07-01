const { register, login, logout, getAllUsers, createUser, updateUser, deleteUsers } = require('./Controller/adminController')
const { getAllRrtUsers, createRrtUser, updateRrtUser, deleteRrtUser, getRrtUserById } = require('./Controller/rrtUserController')
const authAdmin = require('./Middlewares/authAdmin')
// const { getAllUsers } = require('./Controller/adminController')

const adminRouter = require('express').Router()

// Admin Authentication Routes
adminRouter.post("/register", register)
adminRouter.post("/login", login)
adminRouter.post("/logout", logout)

// User Management Routes (Protected)
adminRouter.get("/users", authAdmin, getAllUsers)
adminRouter.post("/users", authAdmin, createUser)
adminRouter.put("/users/:usersId", authAdmin, updateUser)
adminRouter.delete("/users/:usersId", authAdmin, deleteUsers)

// RRT User Management Routes (Protected)
adminRouter.get("/rrt-users", authAdmin, getAllRrtUsers)
adminRouter.post("/rrt-users", authAdmin, createRrtUser)
adminRouter.put("/rrt-users/:userId", authAdmin, updateRrtUser)
adminRouter.delete("/rrt-users/:userId", authAdmin, deleteRrtUser)
adminRouter.get("/rrt-users/:userId", authAdmin, getRrtUserById)

module.exports = adminRouter