var express = require('express');
var router  = express.Router();
var db = require('../database');
var TYPES = require('tedious').TYPES;

/**
 * @api {get} /api/:lat,:long Request User information
 * @apiName GetNearbyStations
 * @apiGroup Station
 *
 * @apiParam {lat} lat Latitude of the current Location.
 * @apiParam {long} long Longitude of the current Location
 *
 * @apiSuccess {String} Id Unique Id of the station.
 * @apiSuccess {String} AddressLine1 Address of the station.
 * @apiSuccess {String} City City (province) of the station.
 * @apiSuccess {String} Country Country of the station.
 * @apiSuccess {String} DisplayName Name of the station.
 * @apiSuccess {String} PostalCode PostalCode of the station.
 * @apiSuccess {Number} Latitude Latitude of the station location.
 * @apiSuccess {Number} Longitude Longitude of the station location.
 */
router.get('/', function(req, res) {
  res.json({ message: 'Returns all stations.'});
});

router.get('/:lat,:long', function (req, res) {
	db.sql("SELECT TOP(10) Id, AddressLine1, City, Country, DisplayName, PostalCode, Latitude, Longitude\
	 FROM ServiceStation st\
	 ORDER BY (geography::Point( @lat, @long, 4326)).STDistance(st.Location)")
	 	.parameter('lat', TYPES.Numeric, req.params.lat,{precision:'9',scale:'6'})
		.parameter('long', TYPES.Numeric, req.params.long,{precision:'9',scale:'6'})
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});



module.exports = router;
