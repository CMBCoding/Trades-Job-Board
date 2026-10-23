// Import express module
import express from 'express';

// Create instance of express application
const app = express();

// Define port number
// for our server to listen on
const PORT = 3009;

// Enable static file serving
app.use(express.static('public'));

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});