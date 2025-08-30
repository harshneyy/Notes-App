// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();
connectDB();

const app = express();

// --- MIDDLEWARE ---



const corsOptions = {
  origin: 'https://notes-app-five-theta.vercel.app/', // <-- PASTE YOUR VERCEL URL HERE
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Use the new options here

app.use(express.json()); // This is crucial! It allows our app to accept JSON.

// --- DEFINE ROUTES ---
app.use('/api/auth', require('./routes/auth')); // Mount the auth routes
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Notes App API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));