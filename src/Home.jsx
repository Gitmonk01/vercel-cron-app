import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [lastCronTimestamp, setLastCronTimestamp] = useState(null); // To track cron-triggered updates

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
      // 1. If manually triggered
      // 2. If a new cron-triggered timestamp is available
      if (isManual || newTimestamp !== lastCronTimestamp) {
        setMessage(newTimestamp);
        if (!isManual) setLastCronTimestamp(newTimestamp); // Update the cron-tracked timestamp
      }
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  // Periodically check for timestamp updates every minute
  useEffect(() => {
    const intervalId = setInterval(() => fetchTimestamp(false), 60000); // Only for cron job triggers
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [lastCronTimestamp]); // Dependency ensures the effect is aware of the last cron timestamp

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
