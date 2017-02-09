var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;
var Logger = require('le_node');
var log = new Logger({
  token:'fb3ab3f2-d8c6-4e77-8ce2-75962936fecc'
});

const stickersMap = {
    'b5018c2fff14ae40':'front-door',
    'a4011c8c1bccdf55':'office-door'};

EstimoteSticker.on('discover', function(estimoteSticker) {
    estimoteSticker.tag = stickersMap[estimoteSticker.id];
    log.log("info",estimoteSticker);
});

EstimoteSticker.startScanning();

