export default function handler(req, res) {
    const currentTime = new Date().toISOString();
    // Save the current time to a file or database (for simplicity, we will return it in response)
    res.status(200).json({
        message: "Cron job executed successfully!",
        time: currentTime,
    });
}