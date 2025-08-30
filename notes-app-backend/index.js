// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This is crucial! It allows our app to accept JSON.

// --- DEFINE ROUTES ---
app.use('/api/auth', require('./routes/auth')); // Mount the auth routes
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Notes App API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));