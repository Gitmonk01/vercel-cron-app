export default function handler(req, res) {
    // You can add a cron job logic here
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
    console.log(`Cron job triggered at: ${currentTime}`);
  
    // Send a response
    res.status(200).end(`Cron job executed at: ${currentTime}`);
  }
  