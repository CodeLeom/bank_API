const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express app
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://localhost/banklist');
mongoose.Promise = global.Promise;

//to use a middleware where all request 
//      from frontend hits before getting fullfilled
app.use(express.static('public'));

app.use(bodyParser.json());

//initiliaze routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});


//listen for requests and the process.env.port will be used to listen for port on a live server that has a .env file
app.listen(process.env.port || 4000, function(){
    console.log("now listening for requests");
});