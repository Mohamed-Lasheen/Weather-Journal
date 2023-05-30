// Setting up an empty JS object to act as endpoint for all routes
let projectData = {};

// Creating variables from packages to able to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Starting up an instance of the app
const app = express();

/* Middleware*/
// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Activating Cors for cross origin allowance
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));


// Setting up a server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

// Get data
app.get('/getData', function(_req, res) {
    res.send(projectData);
});

// Send data
app.post('/sendData', function(req, res) {
    projectData = req.body;
    res.send({
        message: 'Data has been successfully added.'
    });
});