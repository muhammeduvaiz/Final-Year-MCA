const express = require('express');
const app = express();
const dbConfig = require('./dbConfig'); // Import database configuration
require('dotenv').config(); // Load environment variables from .env file
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    next();
});

app.use('/',require('./routes'));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ksrtc';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));