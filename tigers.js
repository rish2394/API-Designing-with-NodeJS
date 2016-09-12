var tigerRouter = require('express').Router();
var _ = require('lodash');
var tigers = require('./tigersData.json').tigers;
var id = 7;

// this middleware will find out the lion with given id and attach to req.lion
// this middleware is only useful for get/:id route
tigerRouter.param('id', function(req, res, next, id){
  //console.log('in params');
  var tiger = _.find(tigers, {id: Number(id)});
  if(tiger){
    req.tiger = tiger;
    next();
  }else{
    res.send();
  }
})

// this middleware will update the id
var updateId = function(req, res, next ){
  req.body.id = id;
  id++;
  next();
}
// adding other router
// tigerRouter.use('/other',otherRouter);

tigerRouter.route('/')
           .get(function(req, res){// this route with GET request will return all the tigers
             res.end(JSON.stringify(tigers, null ,4));
           })
           .post(updateId, function(req, res){//this route will create and return tiger
             var tiger = req.body;
             tigers.push(tiger);
             res.json(tiger);
           })
tigerRouter.route('/:id')
           .get(function(req, res){//this route with GET rqst will return a tiger with specified id
             res.json(req.tiger);
           })
           .delete(function(req, res){
             var id = Number(req.params.id);
             //console.log(id);
             var index = _.findIndex(tigers, {id: id});
             //console.log(index);
             var deletedTiger = tigers[index];
             tigers.splice(index, 1);
             res.json(deletedTiger);
           })
           .put(function(req, res){
               var updatedTiger = req.body;
               console.log(updatedTiger);
               if(updatedTiger.id){
                 delete updatedTiger.id;
               }
               var id = Number(req.params.id);
               console.log(id);
              console.log(updatedTiger);
               var index = _.findIndex(tigers, {id: id});
               console.log(index);
               if(!tigers[index]){
                 res.send();
               } else {
                 var changedTiger = _.assign(tigers[index], updatedTiger);
                 console.log(changedTiger);
                 res.json(changedTiger);
               }
           })
module.exports=tigerRouter
