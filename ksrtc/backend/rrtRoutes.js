const { rrtLogin, rrtLogout, getCurrentRrtUser } = require('./Controller/rrtAuthController');
const authRrt = require('./Middlewares/authRrt');

const rrtRouter = require('express').Router();

// RRT Authentication Routes
rrtRouter.post("/login", rrtLogin);
rrtRouter.post("/logout", rrtLogout);

// Protected RRT Routes
rrtRouter.get("/profile", authRrt, getCurrentRrtUser);

module.exports = rrtRouter; 