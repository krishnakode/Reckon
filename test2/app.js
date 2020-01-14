'use strict';

var express = require('express');
var app = express();
global.app = app;

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  return next();
});

require(__dirname + '/router');
 
app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000');
});