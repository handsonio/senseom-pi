var Bleacon = require('bleacon');
var EstimoteSticker = Bleacon.EstimoteSticker;


EstimoteSticker.on('discover', function(estimoteSticker) {
    console.log(estimoteSticker);
});

