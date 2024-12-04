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

  // Convert UTC timestamp to IST
  const convertToIST = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    // Add 5 hours and 30 minutes to convert to IST (Indian Standard Time)
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    // Format it as 'YYYY-MM-DD HH:mm:ss'
    return istDate.toISOString().replace('T', ' ').substring(0, 19);
  };

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
      
      // Log the raw response to check the API response structure
      console.log('API Response:', response.data);
      
      const newTimestamp = response.data.message; // This should be the UTC timestamp
      
      // Check if the timestamp is null or undefined
      if (!newTimestamp) {
        console.error('No timestamp received from the backend.');
        return;
      }

      // Log the timestamp from the API before conversion
      console.log('Raw API Timestamp (UTC):', newTimestamp);

      // Convert the timestamp to IST
      const newTimestampInIST = convertToIST(newTimestamp);
      
      // Log the converted IST timestamp
      console.log('Converted Timestamp (IST):', newTimestampInIST);

      // Update the message only if manually triggered or a new timestamp is available
      if (isManual || newTimestamp !== lastCronTimestamp) {
        setMessage(newTimestampInIST);
        setLastCronTimestamp(newTimestamp);
        localStorage.setItem('timestampMessage', newTimestampInIST);
        localStorage.setItem('lastCronTimestamp', newTimestamp);
      }
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

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
