const mongoose = require('mongoose');
require('dotenv').config();
const mongouri = process.env.MONGO_URI 
// Connect to MongoDB using Mongoose
mongoose.connect(mongouri)
.then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error);
});