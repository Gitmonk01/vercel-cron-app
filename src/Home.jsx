import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [lastFetched, setLastFetched] = useState(null); // Track the last fetch time

  // Fetch timestamp from the backend API
  const fetchTimestamp = async () => {
    try {
      console.log('Fetching timestamp...');

      const url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/cron'
        : 'https://cron-app-rouge.vercel.app/api/cron';

      const response = await axios.get(url);
      console.log('API Response:', response.data);

      // Update the timestamp only if it differs from the last fetched timestamp
      if (response.data.message !== lastFetched) {
        setMessage(response.data.message);
        setLastFetched(response.data.message); // Store the last fetched timestamp
      }
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  // Fetch the timestamp when the button is clicked
  const handleButtonClick = () => {
    fetchTimestamp();
  };

  // Periodically check for timestamp updates every minute
  useEffect(() => {
    const intervalId = setInterval(fetchTimestamp, 60000); // Poll every 60 seconds
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [lastFetched]); // Re-run effect when the lastFetched state changes

  return (
    <div className="home">
      <button className="timestamp-btn" onClick={handleButtonClick}>
        Get Timestamp
      </button>
      {message && <p>{message}</p>} {/* Display the timestamp */}
    </div>
  );
};

export default Home;
