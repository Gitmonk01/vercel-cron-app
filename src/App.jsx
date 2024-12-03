import { useEffect, useState } from 'react';

function App() {
    const [cronStatus, setCronStatus] = useState(null);

    useEffect(() => {
        const fetchCronStatus = async () => {
            const response = await fetch('/api/cron');
            const data = await response.json();
            setCronStatus(data);
        };

        fetchCronStatus();
    }, []);

    return (
        <div>
            <h1>Cron Job Test</h1>
            {cronStatus ? (
                <div>
                    <p>Status: {cronStatus.message}</p>
                    <p>Last Run Time: {cronStatus.time}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;