var PubNub = require('pubnub')

const stickersMap = {
    'b5018c2fff14ae40':'front-door',
    'a4011c8c1bccdf55':'office-door',
    '486a1154d89e3862':'wearable',
    '58ec63d39087614e':'fridge-door'};

const pubnub = new PubNub({
  publishKey : process.env.PUBNUB_PUBLISH_KEY || 'NO_KEY_PROVIDED',
  subscribeKey : process.env.PUBNUB_SUBSCRIBE_KEY || 'NO_KEY_PROVIDED'
});

const publishConfig = {
  channel : 'senseom_pi'
};


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
    publishBeaconAdvertisement(estimoteSticker);
    io.emit('sticker', estimoteSticker);

});

EstimoteSticker.startScanning();

function publishBeaconAdvertisement(sticker) {
  publishConfig.message = sticker;
  pubnub.publish(publishConfig, function(status, response) {
    console.log(status, response);
  })
}