// creating the router instance
var lionRouter = require('express').Router();
var _ = require('lodash');
var lions = require('./lionData.json').lions;
var id = 7;


// this middleware will update the id
var updateId = function(req, res, next ){
  req.body.id = id;
  id++;
  next();
}
// this middleware will find out the lion with given id and attach to req.lion
lionRouter.param('id', function(req, res, next, id){
  //console.log('in params');
  var lion = _.find(lions, {id: Number(id)});
  if(lion){
    req.lion = lion;
    next();
  }else{
    res.send();
  }
})

// request to this route wil return all the lions
lionRouter.get('/', function(req, res, next){
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(lions, null, 4));
});

// request to this route will return the lion with specified id
lionRouter.get('/:id', function(req, res){
  res.json(req.lion);
});

//request to this route will create and return a new lion
lionRouter.post('/', updateId, function(req, res){
  var lion = req.body;
  console.log(lion);
  lions.push(lion);
  //res.json(lion);
  res.writeHead(201, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(lion, null, 4));
});

//request to this route will delete the lion with specified id
lionRouter.delete('/:id', function(req, res){
  var lion = _.findIndex(lions, {id: Number(req.params.id)});
  if(!lions[lion]){
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion,1);
    res.json(deletedLion);
  }
});

//request to this will update the lion with given id and return the updated lion
// lionRouter.put('/:id', function(req, res){
//    console.log(req.body);
//    res.end('in put');
// });

module.exports = lionRouter;
