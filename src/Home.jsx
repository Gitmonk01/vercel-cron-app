import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [lastCronTimestamp, setLastCronTimestamp] = useState(
    localStorage.getItem('lastCronTimestamp') || null
  ); // Load saved timestamp initially

  // Load the saved timestamp from localStorage on component mount
  useEffect(() => {
    const savedMessage = localStorage.getItem('timestampMessage');
    if (savedMessage) {
      setMessage(savedMessage); // Set the saved message
    }
  }, []);

  // Fetch timestamp from the backend API
  const fetchTimestamp = async (isManual = false) => {
    try {
      console.log('Fetching timestamp...');
      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/cron'
          : 'https://cron-app-rouge.vercel.app/api/cron';

      // Include last known timestamp to the backend for optimization
      const response = await axios.get(url, {
        params: { lastCronTimestamp },
      });
      console.log('API Response:', response.data);

      const newTimestamp = response.data.message;

      // Update the message only if manually triggered or a new timestamp is available
      if (isManual || newTimestamp !== lastCronTimestamp) {
        setMessage(newTimestamp);
        setLastCronTimestamp(newTimestamp);
        localStorage.setItem('timestampMessage', newTimestamp);
        localStorage.setItem('lastCronTimestamp', newTimestamp);
      }
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  // Poll only if the backend indicates a cron update is expected
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        console.log('Polling for cron update...');
        const url =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api/cron'
            : 'https://cron-app-rouge.vercel.app/api/cron';

        const response = await axios.get(url, {
          params: { lastCronTimestamp },
        });

        const newTimestamp = response.data.message;

        // Only update if a new timestamp is detected
        if (newTimestamp && newTimestamp !== lastCronTimestamp) {
          setLastCronTimestamp(newTimestamp);
          setMessage(newTimestamp);
          localStorage.setItem('timestampMessage', newTimestamp);
          localStorage.setItem('lastCronTimestamp', newTimestamp);
        }
      } catch (error) {
        console.error('Error during polling:', error);
      }
    }, 60000); // Poll every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [lastCronTimestamp]);

  return (
    <div className="home">
      <button className="timestamp-btn" onClick={() => fetchTimestamp(true)}>
        Get Timestamp
      </button>
      {message && <p>{message}</p>} {/* Display the timestamp */}
    </div>
  );
};

export default Home;
