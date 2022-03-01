// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// set a port for the localhost
const port = 5000;
// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`the server works on the http://localhost:${port}`);
}

// get route 
app.get('/all', getAll);

//  declare the call back function of the get route
function getAll(request, response) {
    response.send(projectData);
    console.log(projectData);
}

// post route 
app.post('/postData', saveData);
//  declare the call back function of the post route
function saveData(request, response) {
    projectData = { ...request.body };
    response.send(projectData);
}