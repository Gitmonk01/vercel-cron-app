// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');

  // Fetch timestamp from the backend API
  const fetchTimestamp = async () => {
    try {
      const response = await axios.get('/api/timestamp'); // Use relative URL in Vercel (no need for full domain)
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching timestamp:', error);
    }
  };

  // Run fetchTimestamp periodically or on button click
  const handleButtonClick = () => {
    fetchTimestamp();
  };

  return (
    <div className="home">
      <button className="timestamp-btn" onClick={handleButtonClick}>
        Get Timestamp
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
