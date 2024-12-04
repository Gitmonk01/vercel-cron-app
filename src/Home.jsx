import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');

  // Fetch timestamp from the backend API when the button is pressed
  const fetchTimestamp = async () => {
    try {
      console.log('Fetching timestamp...'); // Debugging: Check if function is called

      // Use the correct URL depending on the environment (local or Vercel)
      const url = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api/cron' 
        : 'https://cron-app-rouge.vercel.app/api/cron';

      const response = await axios.get(url); // Fetch the message from the backend
      console.log(response.data); // Debugging: Log API response
      setMessage(response.data.message); // Store the returned message in state
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  return (
    <div className="home">
      <button className="timestamp-btn" onClick={fetchTimestamp}>
        Get Timestamp
      </button>
      {message && <p>{message}</p>} {/* Display the message if it's available */}
    </div>
  );
};

export default Home;
