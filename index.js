var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;
var Logger = require('le_node');
var log = new Logger({
  token:'fb3ab3f2-d8c6-4e77-8ce2-75962936fecc'
});


EstimoteSticker.on('discover', function(estimoteSticker) {
    log.log("info",estimoteSticker);
});

EstimoteSticker.startScanning();

