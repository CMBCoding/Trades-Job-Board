// Import express module
import express from 'express';
//Import the mysql2 module
import mysql2 from 'mysql2'
//Import the dotenv module
import dotenev from 'dotenv'

//Load in the the .env file
dotenev.config();

// Create instance of express application
const app = express();

// Define port number
// for our server to listen on
const PORT = 3009;

//Create a pool to connect to the sql database
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Enable static file serving
app.use(express.static('public'));

//Middleware via express to parse form data and store them in the req.body
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Array to hold and parse the data from the form
const postings = [];
//Add arrays for each posting type to sort later

//Define a default route ("/")
// app.get('/', (req, res) => {
//     res.render('jobs', {postings});
// })

app.get('/add-post', (req, res) => {
    res.render('add-post');
});

app.get('/confirm', (req, res) => {
    res.render('confirm');
});


app.get('/', async(req, res) => {
  try {
    //Pull the postings from the database
    const [postings] = await pool.query(`SELECT * FROM postings 
      ORDER BY PostDate DESC`);
    console.log(postings);
    //Render the pulled postings onto the jobs board
    res.render('jobs', {postings});
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send(`Database error: ${err.message}`);
  }
});

//Define a route for the submission of job posting data
app.post('/confirm', async(req, res) => {

  try {
        //Generate a JSON object to store the order data
    console.log(req.body);

    const post = req.body;
    post.timestamp = new Date();


    const sql = `INSERT INTO postings (JobTitle, CompanyName, 
    TradeArea, Location, PositionType, 
    PositionStatus, StartDate, EndDate, JobUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const params = [  
      post.jobTitle,
      post.companyName,
      post.tradeArea, 
      post.jobLocation, 
      post.positionType,
      post.positionStatus,
      post.jobStartDate,
      post.jobEndDate,
      post.PostDate || null, //Setting or null allows us to figure this time stamp later
      post.jobUrl
    ]

    const [result] = await pool.execute(sql, params);

    //Add an id to each post
    post.id = result.insertId;
    console.log(`Post added with the ID of ${post.id}`);

    res.render('confirm', {post});

  } catch (err) {
    console.error('Error is saving the posting:', err);
    res.status(500).send(`Sorry, there was an error in the procesisng of the post: ${err.message}`);
  }
    

    // //Add the post to the postings array
    // postings.push(post);
    // console.log(post);

    // //Display a confirmation page after successful submission of a post
    // res.render('confirm', {post, postings});
});


// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});