import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState(localStorage.getItem('timestampMessage') || '');  // Load saved message
  const [lastCronTimestamp, setLastCronTimestamp] = useState(localStorage.getItem('lastCronTimestamp') || null);  // Load saved timestamp

  // Listen for server-sent events when the component mounts
  useEffect(() => {
    const eventSource = new EventSource(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/api/cron'
        : 'https://cron-app-rouge.vercel.app/api/cron' // Replace with production URL
    );

    // Event listener for receiving updates
    eventSource.onmessage = (event) => {
      const { message: newTimestamp } = JSON.parse(event.data);

      // Update state only if the timestamp is different
      if (newTimestamp !== lastCronTimestamp) {
        setMessage(newTimestamp);
        setLastCronTimestamp(newTimestamp);
        localStorage.setItem('timestampMessage', newTimestamp);
        localStorage.setItem('lastCronTimestamp', newTimestamp);
      }
    };

    // Cleanup when component is unmounted
    return () => {
      eventSource.close();
    };
  }, [lastCronTimestamp]);

  return (
    <div className="home">
      <p>{message}</p> {/* Display the timestamp */}
    </div>
  );
};

export default Home;
