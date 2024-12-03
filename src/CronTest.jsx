// src/CronTest.jsx
import React, { useEffect, useState } from 'react';

function CronTest() {
    const [userClicks, setUserClicks] = useState(0);
    const [cronClicks, setCronClicks] = useState(0);
    const [message, setMessage] = useState('');

    // Function to fetch click counts from the backend
    const fetchClickCounts = async () => {
        try {
            const response = await fetch('/api/clicks'); // Adjust this URL based on your backend setup
            if (response.ok) {
                const data = await response.json();
                setUserClicks(data.userClicks || 0);
                setCronClicks(data.cronClicks || 0);
            }
        } catch (error) {
            console.error("Error fetching click counts:", error);
        }
    };

    const handleUserClick = async () => {
        try {
            const response = await fetch('/api/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'user' }), // Indicate it's a user click
            });

            if (response.ok) {
                const data = await response.json();
                setUserClicks(prev => prev + 1);
                setMessage(`Clicked by user ${data.userClicks} time${data.userClicks > 1 ? 's' : ''}`);
            }
        } catch (error) {
            console.error("Error recording user click:", error);
        }
    };

    const handleCronClick = async () => {
        try {
            const response = await fetch('/api/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'cron' }), // Indicate it's a FastCron click
            });

            if (response.ok) {
                const data = await response.json();
                setCronClicks(data.cronClicks);
                setMessage(`Clicked by FastCron ${data.cronClicks} time${data.cronClicks > 1 ? 's' : ''}`);
            }
        } catch (error) {
            console.error("Error recording FastCron click:", error);
        }
    };

    useEffect(() => {
        // Fetch initial click counts from the backend when the component mounts
        fetchClickCounts();

        // Set up interval to simulate FastCron clicking every 5 minutes
        const intervalId = setInterval(handleCronClick, 300000); // 300000 ms = 5 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Counter Example</h2>
            <button onClick={handleUserClick}>Click Me!</button>
            <p>{message}</p>
            <p>User Clicks: {userClicks}</p>
            <p>FastCron Clicks: {cronClicks}</p>
        </div>
    );
}

export default CronTest;