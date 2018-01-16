const stickersMap = {
    'b5018c2fff14ae40':'front-door',
    'a4011c8c1bccdf55':'office-door',
    '486a1154d89e3862':'wearable',
    '58ec63d39087614e':'fridge-door'};


var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


EstimoteSticker.on('discover', function(estimoteSticker) {
    estimoteSticker.tag = stickersMap[estimoteSticker.id];
    io.emit('sticker', estimoteSticker);

});

EstimoteSticker.startScanning();

