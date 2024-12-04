import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState(
    localStorage.getItem('timestampMessage') || ''
  ); // Load saved message
  const [lastCronTimestamp, setLastCronTimestamp] = useState(
    localStorage.getItem('lastCronTimestamp') || null
  ); // Load saved timestamp
  const [isPolling, setIsPolling] = useState(true); // Control polling

  // Fetch timestamp from the backend API
  const fetchTimestamp = async (isManual = false) => {
    try {
      console.log('Fetching timestamp...');
      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/cron'
          : 'https://cron-app-rouge.vercel.app/api/cron';

      // Send the lastCronTimestamp to the backend
      const response = await axios.get(url, {
        params: { lastCronTimestamp },
      });

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

  // Polling logic to check for updates
  useEffect(() => {
    if (isPolling) {
      const intervalId = setInterval(async () => {
        try {
          console.log('Polling for cron updates...');
          const url =
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/api/cron'
              : 'https://cron-app-rouge.vercel.app/api/cron';

          // Send the lastCronTimestamp to the backend
          const response = await axios.get(url, {
            params: { lastCronTimestamp },
          });

          const newTimestamp = response.data.message;

          // Update only if a new timestamp is detected
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
    }
  }, [isPolling, lastCronTimestamp]);

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
