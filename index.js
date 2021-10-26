var express = require("express");
var logger = require('morgan');


var apiRouter = require('./api');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API 
app.use('/api/v1', apiRouter);

app.listen(process.env.PORT, () => console.log(`Senseom-pi server is running`))


// var Bleacon = require('bleacon');
// var EstimoteSticker = Bleacon.EstimoteSticker;

// var app = require('express')();
// var server = require('http').Server(app);
// //var io = require('socket.io')(server);

// server.listen(80);

// app.get('/', function (req, res) {
//   res.status(200).json(['beacon1','beacon2','beacon3'])
// });

// app.get('/beacon1', function (req, res) {
//   res.status(200).json(stickerDatabase['beacon1'])
// })

// app.get('/beacon2', function (req, res) {
//   res.status(200).json(stickerDatabase['beacon2'])
// })

// app.get('/beacon3', function (req, res) {
//   res.status(200).json(stickerDatabase['beacon3'])
// })


// EstimoteSticker.on('discover', function(estimoteSticker) {
    
//     estimoteSticker.tag = stickersMap[estimoteSticker.id];

//     stickerDatabase[stickersMap[estimoteSticker.id]] = estimoteSticker
//     //publishBeaconAdvertisement(estimoteSticker);
//   //  io.emit('sticker', estimoteSticker);

// });

// EstimoteSticker.startScanning();

// // function publishBeaconAdvertisement(sticker) {
// //   publishConfig.message = sticker;
// //   pubnub.publish(publishConfig, function(status, response) {
// //       if(status.error === true) {
// //         console.log(status, response);
// //       }
// //   });
// // }