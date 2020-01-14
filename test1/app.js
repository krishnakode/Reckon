'use strict';

var express = require('express');
var app = express();
global.app = app;

// Log all requests.
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  return next();
});

require(__dirname + '/router');
 
app.listen(9999, function(){
    console.log('Server running at port 9999: http://localhost:9999');
});