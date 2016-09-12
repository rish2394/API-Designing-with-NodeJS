var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var lionRouter = require('./lions');
var tigerRouter = require('./tigers');
// express.static will serve everything
// with in client as a static resource
// also,it will serve the index.html on the
// root of that directory on a " GET TO '/' "
// will serve index.html if client makes a GET request to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can access data we post on as "req.body"
// By default express doesn't know how to handle
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.use(function(err, req, res, next){
  if(err){
    console.log(err.message);
    res.status(500).send(err);
  }
});

module.exports = app;
