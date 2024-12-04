// api/timestamp.js

module.exports = (req, res) => {
    // Get current timestamp in Indian Standard Time (IST)
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
    // Log the timestamp for debugging purposes (optional)
    console.log(`Timestamp triggered at: ${currentTime}`);
    
    // Send the timestamp as a response
    res.status(200).json({ message: `Last clicked on ${currentTime}` });
  };
  