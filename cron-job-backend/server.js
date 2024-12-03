// server.js
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let message;

// Function to read message from JSON file
const loadMessageFromFile = () => {
    const filePath = process.env.MESSAGE_FILE_PATH || './config/message.json';
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        message = jsonData.message;
    } catch (error) {
        console.error("Error reading message file:", error);
        message = "Error loading message.";
    }
};

// Load initial message from file
loadMessageFromFile();

// Endpoint to get the latest message
app.get('/api/message', (req, res) => {
    res.json({ message });
});

// Schedule a cron job to update the message every 5 minutes
cron.schedule('*/5 * * * *', () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    message = `Cron Job Updated at ${formattedTime}`;
    console.log(message); // Log for debugging
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});