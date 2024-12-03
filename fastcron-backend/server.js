const express = require("express");
const cors = require("cors");
const app = express();

let message = "Message updated by Fast Cron";
let updatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

app.use(cors());
app.use(express.json());

// Endpoint to fetch the latest message
app.get("/api/message", (req, res) => {
  res.json({ message, updatedAt });
});

// Endpoint for Fast Cron to update the message
app.post("/api/update-message", (req, res) => {
  message = "Message updated by Fast Cron";
  updatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log("Message updated at:", updatedAt);
  res.sendStatus(200);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
