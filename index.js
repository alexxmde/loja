const express = require('express'),
      bodyParser = require('body-parser'),
      router = require('./api/routes'),
      mongoose = require('mongoose'),
      userCtrl = require('./api/controllers/userController'),
      fs = require('fs'),
      https = require('https');

let app = express();

app.set('port', (process.env.PORT || 8081))
app.set('mongodbURI', ('mongodb://loja:cthulhu1@localhost:27018/loja'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',express.static('app'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
});

app.post('/login', userCtrl.login);
app.use(router);

/*
https.createServer({
	key: fs.readFileSync('privkey.pem'),
	cert: fs.readFileSync('fullchain.pem')
}, app).listen(app.get('port'), (err,err2) => { 
	if(err)
		console.log(err)
	else
		console.log("Up at port: " + app.get('port'))
})


mongoose.connect(app.get('mongodbURI'))
*/

app.listen(app.get('port'), err => {
  err ? console.log(err) :console.log("Running: " + app.get('port'));

  mongoose.connect(app.get('mongodbURI'))
  console.log(app.get('mongodbURI'))
}) 

