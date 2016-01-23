var express = require('express');
var expressWinston = require('express-winston');
var winston = require('winston');
require('winston-rsyslog2');
var app = express();
    
// Place the express-winston logger before the router.
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Rsyslog({
        level: 'debug',
        protocol: 'U' // T for TCP
    })
  ]
}));

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});