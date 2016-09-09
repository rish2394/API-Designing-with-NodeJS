var express = require('express');
var fs = require('fs');
var app = express();
var data = {
  count: 12,
  message: "hello"
}

app.get('/',function(req,res){
    //fs.createReadStream(__dirname + '/index.html').pipe(res);
    var options = {
      root: __dirname,
      dotfiles: 'deny',
      headers: {
          'Content-Type': 'text/html'
      }
    };
    res.sendFile('index.html', options, function(err){
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', 'index.html');
      }
    })

});

app.get('/data',function(req,res){
  res.end(JSON.stringify(data, null, 4));
});

app.listen(3000,function(){
  console.log('Server started listening on 3000');
});
