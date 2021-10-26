var express     = require('express');
const HTTPStatusAndMessage = require('../HTTPStatusAndMessage')


const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const stickersMap = {
    'a4011c8c1bccdf55':'beacon1',
    'a435b39904f64794':'beacon2',
    'f9d4334332bb3af1':'beacon3',
};

var data = [{}, {}, {}]

var beacons = express.Router();

beacons.get("/", async (req, res, next) => {
    res.json(data)
});


scanner.onadvertisement = (ad) => {
    console.log(ad.id + ' / ' + ad.beaconType)
    console.log(objToString(ad))
  
    if(ad.estimoteNearable) {
      
        switch(ad.estimoteNearable.nearableId) {
            case 'a4011c8c1bccdf55': 
                data[0] = ad.estimoteNearable
                break
            case 'a435b39904f64794':
                data[1] = ad.estimoteNearable
                break
            case 'f9d4334332bb3af1':
                data[2] = ad.estimoteNearable
                break

        }

      console.log(objToString(ad.estimoteNearable))    

      console.log(objToString(ad.estimoteNearable.acceleration))
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
  
module.exports = beacons;