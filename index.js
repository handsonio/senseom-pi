const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();


scanner.onadvertisement = (ad) => {
  console.log(ad.id + ' / ' + ad.beaconType)
  
  
  console.log(objToString(ad))
  if(ad.estimoteNearable) {
    console.log(objToString(ad.estimoteNearable))    
  }


}

function objToString(obj) {
  let str = '';
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + '::' + obj[p] + '\n';
    }
  }
  return str;
}

// Start scanning for iBeacons
scanner.startScan().then(() => {
  console.log('Started to scan.');
}).catch((error) => {
  console.error(error);
});

// const stickersMap = {
//     'a4011c8c1bccdf55':'beacon1',
//     'a435b39904f64794':'beacon2',
//     'f9d4334332bb3af1':'beacon3',
// };


// const stickerDatabase = {
//     'beacon1':null,
//     'beacon2':null,
//     'beacon3':null
// }


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