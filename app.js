const express = require('express');
const app = express();
const mongoose = require('mongoose');   //import mongoose
const bodyParser = require('body-parser');  //Node.js body parsing middleware. send request body as a json text
const passport = require('passport');   //Passport is authentication middleware for Node.js. //provide a session and a token //
const cors = require('cors');      //Cross Origin Resource Sharing - allow to data transfer between multiple domains (frontend -> Backend & Backend -> frontend)    get data from localhost 4200 and send to localhost 3000 and reverse
const config = require('./config/database');    //import database.js to app.js
const user = require('./controller/userController');     //to access users controller method I need to import userController.js to app.js
const project=require('./controller/projectController');
const port = process.env.PORT || 3000;



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());             // parse application/json
app.use(passport.initialize());         //from passport doc
app.use(passport.session());            //from passport  doc
require('./config/passport')(passport);    // initialize passport

//if /currentUser route come to the application, it look for the currentUser variable(userController)
app.use('/user', user);

//if /project route come to the application, it look for the project variable(projectController)
app.use('/project',project);

//connect to db
const connection = mongoose.connect(config.database);
if (connection) {
    console.log("Database connected Successfully");
} else {
    console.log("Database not connected");
}

//callback to listening
app.listen(port, () => {
    console.log("listening to port: "+port);
});