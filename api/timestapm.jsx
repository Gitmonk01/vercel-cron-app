// api/timestamp.js
export default function handler(req, res) {
    const currentDate = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const indiaTime = currentDate.toLocaleString('en-IN', options);
    
    res.status(200).json({ message: `Last clicked on ${indiaTime}` });
  }
  