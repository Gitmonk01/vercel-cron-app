const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for client requests
app.use(cors());

// Simulate a cron job that triggers every minute
let lastCronTimestamp = new Date().toISOString();  // Initial timestamp

// Endpoint to handle SSE
app.get('/api/cron', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send the initial timestamp when the connection is established
  res.write(`data: ${JSON.stringify({ message: `Cron job executed at: ${lastCronTimestamp}` })}\n\n`);

  // Simulate a cron job that updates every 60 seconds
  const cronInterval = setInterval(() => {
    lastCronTimestamp = new Date().toISOString(); // New timestamp for cron job execution
    res.write(`data: ${JSON.stringify({ message: `Cron job executed at: ${lastCronTimestamp}` })}\n\n`);
  }, 60000);  // Trigger every 60 seconds
  
  // Cleanup when the client closes the connection
  req.on('close', () => {
    clearInterval(cronInterval);
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
