import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  
  // Fetch timestamp from the backend API
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

  // Fetch the timestamp immediately when the component mounts
  useEffect(() => {
    fetchTimestamp(); // Fetch timestamp as soon as the component loads

    // Set up polling to fetch timestamp every minute (60000ms)
    const intervalId = setInterval(fetchTimestamp, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Log the message state whenever it updates
  useEffect(() => {
    console.log('Updated message:', message); // Debugging: Check updated message
  }, [message]);

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
