var express = require('express')
var morgan = require('morgan')
var stream = require('stream')
var syslog = require('syslogudp') // Use package "syslog" for TCP
var util = require('util')

var app = express();

// Transport //
function SyslogStream() {
  stream.Writable.call(this, { decodeStrings: false })
  this.logger = syslog.createClient(514, 'localhost')
}

util.inherits(SyslogStream, stream.Writable)

SyslogStream.prototype.write = function write(chunk, encoding, callback) {
  this.logger.info(chunk);
}

app.use(morgan('combined', {stream: new SyslogStream()}))

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});