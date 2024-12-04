export default function handler(req, res) {
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
    // Send message as part of the response
    res.status(200).json({ message: `Cron job executed at: ${currentTime}` });
  }
  