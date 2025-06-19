const { login, logout } = require('./Controller/userControllers')
const authUsers = require('./Middlewares/authUsers')

const userRouter = require('express').Router()

// Public routes
userRouter.post("/login", login)
userRouter.post("/logout", logout)

// Protected route example - requires authentication
userRouter.get("/profile", authUsers, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    })
})

module.exports = userRouter