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
// this middleware is only useful for get/:id route
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

lionRouter.route('/')
          .get(function(req, res, next){// request to this route with GET request will return all the lions
              res.writeHead(200, {'Content-Type': 'application/json'})
              res.end(JSON.stringify(lions, null, 4));
          })
          .post(updateId, function(req, res){//request to this route with POST rqst create and return a new lion
            var lion = req.body;
            // console.log(req)
            // console.log('body', req.body)
            // console.log(lion);
            lions.push(lion);
            //res.json(lion);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(lion, null, 4));
          //  console.log(res)
          //  console.log(lion)

          });

lionRouter.route('/:id')
          .get(function(req, res){// request to this route with GET rqst will return the lion with specified id
            res.json(req.lion);
          })
          .delete(function(req, res){//request to this route with DELETE rqst will delete the lion with specified id
            var lion = _.findIndex(lions, {id: Number(req.params.id)});
            if(!lions[lion]){
              res.send();
            } else {
              var deletedLion = lions[lion];
              //console.log(req.body);
              lions.splice(lion,1);
              res.json(deletedLion);
            }
          })
          .put(function(req, res){
            var updateLion = req.body;
            // console.log(req.body);
            if(updateLion.id){
              delete updateLion.id;
            }
            var index = _.findIndex(lions, {id: Number(req.params.id)});
          //  console.log(index);
            if(!lions[index]){
              res.send();
            } else {
              var updatedLion = _.assign(lions[index], updateLion)
              res.json(updateLion);
            }
          })

module.exports = lionRouter;
