var express     = require('express');
const HTTPStatusAndMessage = require('../HTTPStatusAndMessage')


const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const stickersMap = {
    'a4011c8c1bccdf55':'beacon1',
    'a435b39904f64794':'beacon2',
    'f9d4334332bb3af1':'beacon3',
};

var EXPECTED_MANUFACTURER_DATA_LENGTH = 22;

var data = [{}, {}, {}]

var beacons = express.Router();

beacons.get("/", async (req, res, next) => {
    res.json(data)
});

beacons.param("beaconId", async (req, res, next, id) => {
    switch(id) {
        case 'a4011c8c1bccdf55': 
        req.beacon = data[0]
        break
    case 'a435b39904f64794':
        req.beacon = data[1]
        break
    case 'f9d4334332bb3af1':
        req.beacon = data[2]
        break        
    }

    next()

})


beacons.get("/:beaconId([0-9a-fA-F]{16})", async (req, res, next) => {
    res.json(req.beacon)
})


beacons.get("/:beaconId([0-9a-fA-F]{16})/temperature", async (req, res, next) => {
    res.json(req.beacon.temperature)
})


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
  
  function convertMotionStateDuration(raw) {
    var unit = (raw >> 6) & 0x03;
    var duration = (raw & 0x3f);
  
    if (unit === 1) {
      duration *= 60;
    } else if (unit === 2) {
      duration *= (60 * 60);
    }
  
    return duration;
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