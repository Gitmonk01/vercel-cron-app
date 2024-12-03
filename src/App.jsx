import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const updateMessage = () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
        setMessage(`Cron Job Updated at ${formattedTime}`);
    };

    useEffect(() => {
        // Initial message update
        updateMessage();

        // Set up interval to update message every 5 minutes
        const intervalId = setInterval(updateMessage, 300000); // 300000 ms = 5 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to My Vite React App</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;