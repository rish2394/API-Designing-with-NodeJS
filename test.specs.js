var app = require('./app');
var request = require('supertest');
var chai = require('chai').expect;

describe('GET /lions', function() {
  it('should get all the lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        chai(res.body).to.be.an('array')
        done();
      });
  });
});

describe('GET /lions/id', function(){
    it('should get one lion', function(done){
      request(app)
       .get('/lions/4')
       .set('Accept', 'application/json')
       .expect(200)
       .expect('Content-Type', /json/)
       .end(function(err, res){
         if(err){
           return done(err);
         }
         //console.log(res.body);
         chai(res.body.id).to.be.equal(4);
         done();
       })
    });
});

describe('POST /lions', function(){
  var lion ={
    "name": "dimpy",
    "age": 62,
    "id": 7,
    "pride": "the farzi cats",
    "gender":"female"
  };
  it('should add lion', function(done){
    request(app)
    .post('/lions')
    .send(lion)
    .set('Accept', 'application/json')
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      if(err) return done(err);
    //  console.log('res.body=',res.body);
      chai(res.body).to.be.eql(lion);
      chai(res.body.name).to.be.equal('dimpy');
      chai(res.body.age).to.be.equal(62);
      chai(res.body.pride).to.be.equal('the farzi cats');
      chai(res.body.gender).to.be.equal('female');
      //chai(res.body.name).to.be.equal('dimpy');
      done();
    })
  })
})

describe('DELETE /lions/id', function(){
  var lion = { name: 'simba',
  id: 1,
  age: 6,
  pride: 'the cool cats',
  gender: 'male' }
  it('should delete the lion with specified id', function(done){
      request(app)
      .del('/lions/6')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        console.log('res.body=',res.body);
        chai(res.body.name).to.be.equal('brutus');
        done();
      })
  })
})
