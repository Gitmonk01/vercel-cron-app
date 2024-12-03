import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Fetching message...");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchMessage = async () => {
    try {
      const response = await axios.get("https://cron-app-rouge.vercel.app/api/update-message");
      setMessage(response.data.message);
      setLastUpdated(response.data.updatedAt);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  useEffect(() => {
    fetchMessage();
    const interval = setInterval(fetchMessage, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
      <p>Last Updated: {lastUpdated}</p>
    </div>
  );
}

export default App;
