// Import express module
import express from 'express';

// Create instance of express application
const app = express();

// Define port number
// for our server to listen on
const PORT = 3009;

// Enable static file serving
app.use(express.static('public'));

//Middleware via express to parse form data and store them in the req.body
app.use(express.urlencoded({extended: true}));

//Array to hold and parse the data from the form
const postings = [];

//Define a default route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

//Define a route for the submission of job posting data
app.post('/submit-post', (req, res) => {

    //Generate a JSON object to store the order data
    console.log(req.body);

    const post = req.body;
    post['timestamp'] = new Date(); //Log the timestamp of the post submission

    //Add the post to the postings array
    postings.push(post);
    console.log(post);

    //Display a confirmation page after successful submission of a post
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
})


// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});