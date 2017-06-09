var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var livereload = require('livereload');


var config = require('../config/');

var app = express();
var port = config.port || process.env.PORT;
var livereload = livereload.createServer();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', express.static(process.cwd() + '/client'));

app.route('/api/dob-jobs')
  .get(function(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json('{success:1}');
  });

var server = app.listen(config.port, function() {
  console.log('Server application running at http://localhost:' + config.port);
})
