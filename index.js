const stickersMap = {
    'b5018c2fff14ae40':'front-door',
    'a4011c8c1bccdf55':'office-door',
    '486a1154d89e3862':'wearable',
    '58ec63d39087614e':'fridge-door'};


var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;
var Logger = require('le_node');

var log = new Logger({
  token:'fb3ab3f2-d8c6-4e77-8ce2-75962936fecc'
});

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('log', function (data) {
    log.log("info",data);
  });
});


EstimoteSticker.on('discover', function(estimoteSticker) {
    estimoteSticker.tag = stickersMap[estimoteSticker.id];
    estimoteSticker.mathis = 'aprenti';
    log.log("info",estimoteSticker);
});

EstimoteSticker.startScanning();

