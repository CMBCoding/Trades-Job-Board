// Import express module.
import express from 'express';
//Import the mysql2 module.
import mysql2 from 'mysql2'
//Import the dotenv module.
import dotenev from 'dotenv'
//Import the session module.
import session from 'express-session'

//Load in the the .env file.
dotenev.config();

// Create instance of express application.
const app = express();

// Define port number for our server to listen on.
const PORT = 3009;

//Create a pool to connect to the sql database.
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Enable static file serving.
app.use(express.static('public'));

//Middleware via express to parse form data and store them in the req.body.
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//session middleware (remembers users).
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60}
}));

// function middleware that checks if user is logged in.
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

//Array to hold and parse the data from the form.
const postings = [];

// TEMPORARY: session test route (remove in Part 4)
// app.get('/session-test', (req, res) => {
//     req.session.views = (req.session.views || 0) + 1;
//     res.send(`Visits: ${req.session.views}<br>
//         Logged in: ${req.session.loggedIn === true}`);
// });

app.get('/login', (req, res) => {
  res.render('login', {error: null})
});

app.post('/login', (req, res) => {
    //Process login info.
    const username = req.body.username;
    const password = req.body.password;

    //compare with .env values.
    if(username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD) {
            req.session.loggedIn = true;
            res.redirect('/add-post');
        } else {
            res.render('login', 
                {error: 'Invalid username or password'});
        }
});

//destroys session.
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Creates route to add-post page.
app.get('/add-post', requireLogin, (req, res) => {
    res.render('add-post', {title: 'Add Jobs - Green River College'});
});

// Creates a route to confirm page.
app.get('/confirm', (req, res) => {
    res.render('confirm', {title: 'Add Jobs - Confirmation - Green River College'});
});

// Creates a route to home page and send it sorted data from the database.
app.get('/', async(req, res) => {
  try {
    //Pull the postings from the database. Do not pull ones that have a EndDate less than or equal to today's date.
    const [postings] = await pool.query(`SELECT * FROM postings WHERE EndDate >= CURRENT_DATE() ORDER BY PostDate ASC;`);
    console.log(postings);
    //Render the pulled postings onto the jobs board. Also send title for the page.
    res.render('jobs', {postings, title: 'Trades Internships & Jobs Board - Green River College'});
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

    // SQL command for creating a new row in the database.
    const sql = `INSERT INTO postings (JobTitle, CompanyName, 
    TradeArea, Location, PositionType, 
    PositionStatus, EndDate, JobUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`

    // Parameters to be added into the SQL command.
    const params = [  
      post.jobTitle,
      post.companyName,
      post.tradeArea, 
      post.jobLocation, 
      post.positionType,
      post.positionStatus ?? NULL,
      post.jobEndDate,
      post.jobUrl
    ]
    // Send SQL command to database and receives data.
    const [result] = await pool.execute(sql, params);

    //Add an id to each post
    post.id = result.insertId;
    console.log(`Post added with the ID of ${post.id}`);

    res.render('confirm', {post, title: 'Add Jobs - Confirmation - Green River College'});

  } catch (err) {
    console.error('Error is saving the posting:', err);
    res.status(500).send(`Sorry, there was an error in the procesisng of the post: ${err.message}`);
  }
});

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});