var express = require('express');
var router  = express.Router();
var db = require('../database');
var TYPES = require('tedious').TYPES;
var conv_i18n = require('../lib/sql-helper.js').conv_i18n;


router.get('/', function(req, res) {
  db.sql("SELECT * FROM ServiceStation_2lang_utf8")
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

/**
 * @api {get} /api/stations/nearbyStations/:lat,:long,:lang Request nearby stations
 * @apiName GetNearbyStations
 * @apiGroup Station
 *
 * @apiParam {String} lat Latitude of the current Location.
 * @apiParam {String} long Longitude of the current Location
 * @apiParam {String} lang Language of the interface
 *
 * @apiSuccess {String} Id Unique Id of the station.
 * @apiSuccess {String} Address Address of the station.
 * @apiSuccess {String} City City (province) of the station.
 * @apiSuccess {String} Country Country of the station.
 * @apiSuccess {String} DisplayName Name of the station.
 * @apiSuccess {String} PostalCode PostalCode of the station.
 * @apiSuccess {Number} Latitude Latitude of the station location.
 * @apiSuccess {Number} Longitude Longitude of the station location.
 * @apiSuccess {Number} Distance Distance of the station from the current location
 */
router.get('/nearbyStations/:lat,:long,:lang', function (req, res) {
	db.sql(conv_i18n('Select Id, AddressLine[_lang], City[_lang], Country, DisplayName[_lang], PostalCode, Latitude, Longitude, (geography::Point( @lat, @long, 4326)).STDistance(st.Location) Distance',req.params.lang) +
	 " FROM ServiceStation st\
	 ORDER BY Distance")
	 	.parameter('lat', TYPES.Numeric, req.params.lat,{precision:'9',scale:'6'})
		.parameter('long', TYPES.Numeric, req.params.long,{precision:'9',scale:'6'})
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

/**
 * @api {get} /api/getByKeyword/:keyword,:lang Request stations by keyword
 * @apiName GetStaionsByKeyword
 * @apiGroup Station
 * 
 * @apiParam {String} lat Latitude of the current Location.
 * @apiParam {String} long Longitude of the current Location
 * @apiParam {String} keyword Keyword used to search for the stations
 * @apiParam {String} lang Language of the interface
 *
 * @apiSuccess {String} Id Unique Id of the station.
 * @apiSuccess {String} Address Address of the station.
 * @apiSuccess {String} City City (province) of the station.
 * @apiSuccess {String} Country Country of the station.
 * @apiSuccess {String} DisplayName Name of the station.
 * @apiSuccess {String} PostalCode PostalCode of the station.
 * @apiSuccess {Number} Latitude Latitude of the station location.
 * @apiSuccess {Number} Longitude Longitude of the station location.
 * @apiSuccess {Number} Distance Distance of the station from the current location
 */
router.get('/getByKeyword/:lat,:long,:keyword,:lang', function (req, res) {
	db.sql(conv_i18n('Select Id, AddressLine[_lang], City[_lang], Country, DisplayName[_lang], PostalCode, Latitude, Longitude, (geography::Point( @lat, @long, 4326)).STDistance(st.Location) Distance',req.params.lang) +
	 " FROM ServiceStation st\
	 WHERE DisplayName_"+ req.params.lang +" LIKE ('%'+@keyword+'%')\
	 	OR City_"+ req.params.lang +" LIKE ('%'+@keyword+'%')\
		 OR AddressLine_"+ req.params.lang +" LIKE ('%'+@keyword+'%')")
		.parameter('lat', TYPES.Numeric, req.params.lat,{precision:'9',scale:'6'})
		.parameter('long', TYPES.Numeric, req.params.long,{precision:'9',scale:'6'})
	 	.parameter('keyword', TYPES.NChar, req.params.keyword)
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

router.get('/getStationFuelTypeById/:id', function (req, res) {
	db.sql("")
		.parameter('id', TYPES.Char, req.params.id)
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

router.get('/getStationServicesById/:id', function (req, res) {
	db.sql("")
		.parameter('id', TYPES.Char, req.params.id)
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});


module.exports = router;
