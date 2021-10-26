var express     = require('express');
const HTTPStatusAndMessage = require('../HTTPStatusAndMessage')


const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();


var data = []

var beacons = express.Router();

beacons.get("/", async (req, res, next) => {
    res.json(data)
});


scanner.onadvertisement = (ad) => {
    console.log(ad.id + ' / ' + ad.beaconType)
    console.log(objToString(ad))
  
    if(ad.estimoteNearable) {
      
      console.log(objToString(ad.estimoteNearable))    
  
      console.log(objToString(ad.estimoteNearable.acceleration))
    }
  
  //nearableId::f9d4334332bb3af1
  //temperature::22.125
  //moving::false
  //acceleration:
  
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
  
module.exports = beacons;