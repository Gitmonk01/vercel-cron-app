import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const fetchMessage = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/message');
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    };

    useEffect(() => {
        // Fetch initial message when component mounts
        fetchMessage();

        // Set an interval to fetch the message every 5 minutes
        const intervalId = setInterval(fetchMessage, 300000); // 300000 ms = 5 minutes

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