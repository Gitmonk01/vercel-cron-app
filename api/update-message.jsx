export default async function handler(req, res) {
    if (req.method === "POST") {
      const currentTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
  
      global.message = "Message updated by Fast Cron";
      global.updatedAt = currentTime;
  
      console.log(`Message updated at: ${currentTime}`);
      res.status(200).json({ success: true });
    } else if (req.method === "GET") {
      res.status(200).json({
        message: global.message || "No updates yet",
        updatedAt: global.updatedAt || "Not updated yet",
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  