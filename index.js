var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;
var Logger = require('le_node');
var log = new Logger({
  token:'fb3ab3f2-d8c6-4e77-8ce2-75962936fecc'
});

const stickersMap = {
    'b5018c2fff14ae40':'front-door',
    'a4011c8c1bccdf55':'wearable',
    '486a1154d89e3862':'wc-door',
    '58ec63d39087614e':'fridge-door'};

EstimoteSticker.on('discover', function(estimoteSticker) {
    estimoteSticker.tag = stickersMap[estimoteSticker.id];
    log.log("info",estimoteSticker);
});

EstimoteSticker.startScanning();

