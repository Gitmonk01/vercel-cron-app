import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [lastCronTimestamp, setLastCronTimestamp] = useState(null);

  // Load the saved timestamp from localStorage on component mount
  useEffect(() => {
    const savedMessage = localStorage.getItem('timestampMessage');
    if (savedMessage) {
      setMessage(savedMessage); // Set the saved message
    }
  }, []); // Run only once on component mount

  // Fetch timestamp from the backend API
  const fetchTimestamp = async (isManual = false) => {
    try {
      console.log('Fetching timestamp...');
      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/cron'
          : 'https://cron-app-rouge.vercel.app/api/cron';

      const response = await axios.get(url);
      console.log('API Response:', response.data);

      const newTimestamp = response.data.message;

      // Update the message only under specific conditions:
      if (isManual || newTimestamp !== lastCronTimestamp) {
        setMessage(newTimestamp);
        localStorage.setItem('timestampMessage', newTimestamp); // Save to localStorage
        if (!isManual) setLastCronTimestamp(newTimestamp); // Update the cron-tracked timestamp
      }
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  // Conditional polling to check for cron job updates
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        console.log('Polling for cron update...');
        await fetchTimestamp(false); // Only fetch for cron updates
      } catch (error) {
        console.error('Error during polling:', error);
      }
    }, 60000); // Poll every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [lastCronTimestamp]); // Dependency ensures polling logic responds to state

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
