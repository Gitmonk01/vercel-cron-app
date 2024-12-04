const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const PORT = 5000;

// To store the timestamp in memory (could be replaced with a DB if needed)
let lastClicked = "";

// Serve the frontend (if hosted locally or on a separate server)
const FRONTEND_URL = 'http://localhost:3000'; // change this to the URL of your frontend if hosted

// Simulate the button click by sending an HTTP request to the frontend
const clickButton = () => {
  const currentIndianTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });
  lastClicked = `Last clicked on '${currentIndianTime}'`;

  // You can trigger frontend using a fetch or axios here if your frontend has an API for this
  // Sending request to the frontend
  axios.post(`${FRONTEND_URL}/update-timestamp`, { timestamp: lastClicked })
    .then(response => {
      console.log('Timestamp updated in frontend');
    })
    .catch(error => {
      console.error('Error updating timestamp in frontend:', error);
    });
};

// Set up cron job that runs every minute, adjust as needed
cron.schedule('* * * * *', () => {
  console.log('Cron job triggered...');
  clickButton();
});

// Endpoint to get the last clicked timestamp
app.get('/get-timestamp', (req, res) => {
  res.json({ timestamp: lastClicked });
});

// Endpoint to update the timestamp (called by cron job)
app.post('/update-timestamp', (req, res) => {
  const { timestamp } = req.body;
  lastClicked = timestamp;
  res.status(200).send('Timestamp updated');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
