var express     = require('express');
const HTTPStatusAndMessage = require('./HTTPStatusAndMessage')
var beacons       = require('./beacons')



var ressources  = express.Router();

ressources.use('/beacons', beacons);

ressources.use(function(req, res) {
    res.status(HTTPStatusAndMessage.RESOURCE_NOT_FOUND_404.code).json(HTTPStatusAndMessage.RESOURCE_NOT_FOUND_404)
});

module.exports = ressources;