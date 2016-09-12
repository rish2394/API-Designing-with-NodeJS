var tigerRouter = require('express').Router();
var _ = require('lodash');
var tigers = require('./tigersData.json').tigers;

// adding other router
// tigerRouter.use('/other',otherRouter);


// this route will return all the tigers
tigerRouter.get('/', function(req, res){
  res.end(JSON.stringify(tigers, null ,4));
});

//this route will return a tiger with specified id
tigerRouter.get('/:id', function(req, res){
  var id = Number(req.params.id);
  var tiger = _.find(tigers, {id: id});
  res.json(tiger);
});

module.exports=tigerRouter
