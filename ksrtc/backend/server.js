
const express = require('express');
const app = express();
const dbConfig = require('./dbConfig'); // Import database configuration
require('dotenv').config(); // Load environment variables from .env file
const port = process.env.PORT
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./routes'));

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});