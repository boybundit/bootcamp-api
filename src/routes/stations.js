var express = require('express');
var router  = express.Router();
var db = require('../database');
var TYPES = require('tedious').TYPES;
var conv_i18n = require('../lib/sql-helper.js').conv_i18n;
var langHelper = require('../lib/lang-helper');


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
 * @api {get} /api/stations/nearbyStations/:lat,:long Request nearby stations
 * @apiName GetNearbyStations
 * @apiGroup Station
 * @apiHeader {String} Accept-Language Prefered languages. (Accept-Language: th)
 *
 * @apiParam {Number} lat Latitude of the current Location.
 * @apiParam {Number} long Longitude of the current Location
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
router.get('/nearbyStations/:lat,:long', function (req, res) {
	var language = langHelper.getRequestedLanguage(req);
	db.sql(conv_i18n('Select Id, AddressLine[_lang], City[_lang], Country, DisplayName[_lang], PostalCode, Latitude, Longitude, (geography::Point( @lat, @long, 4326)).STDistance(st.Location) Distance',language) +
	 " FROM ServiceStation st\
	 ORDER BY Distance")
	 	.parameter('lat', TYPES.Numeric, req.params.lat,{precision:'9',scale:'6'})
		.parameter('long', TYPES.Numeric, req.params.long,{precision:'9',scale:'6'})
		.execute()
		.then(function (results) {
			//console.log(language);
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

/**
 * @api {get} /api/stations/getByKeyword/:lat,:long,:keyword Request stations by keyword
 * @apiName GetStationsByKeyword
 * @apiGroup Station
 * @apiHeader {String} Accept-Language Prefered languages. (Accept-Language: th)
 * 
 * @apiParam {Number} lat Latitude of the current Location.
 * @apiParam {Number} long Longitude of the current Location
 * @apiParam {String} keyword Keyword used to search for the stations
 *
 * @apiSuccess {String} Id Unique Id of the station.
 * @apiSuccess {String} AddressLine Address of the station.
 * @apiSuccess {String} City City (province) of the station.
 * @apiSuccess {String} Country Country of the station.
 * @apiSuccess {String} DisplayName Name of the station.
 * @apiSuccess {String} PostalCode PostalCode of the station.
 * @apiSuccess {Number} Latitude Latitude of the station location.
 * @apiSuccess {Number} Longitude Longitude of the station location.
 * @apiSuccess {Number} Distance Distance of the station from the current location
 */
router.get('/getByKeyword/:lat,:long,:keyword', function (req, res) {
	var language = langHelper.getRequestedLanguage(req);
	//console.log(language);
	db.sql(conv_i18n('Select Id, AddressLine[_lang], City[_lang], Country, DisplayName[_lang], PostalCode, Latitude, Longitude, (geography::Point( @lat, @long, 4326)).STDistance(st.Location) Distance', language) +
	 " FROM ServiceStation st\
	 WHERE DisplayName_"+ language +" LIKE ('%'+@keyword+'%')\
	 	OR City_"+ language +" LIKE ('%'+@keyword+'%')\
		 OR AddressLine_"+ language +" LIKE ('%'+@keyword+'%')")
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

/**
 * @api {get} /api/stations/getStationServicesById/:id Request services of one station
 * @apiName GetStationServices
 * @apiGroup Station
 * @apiHeader {String} Accept-Language Prefered languages. (Accept-Language: th)
 * 
 * @apiParam {String} id Id of the station
 *
 * @apiSuccess {Id} Id Id of the station.
 * @apiSuccess {Object[]} Services Services provided in the station
 * @apiSuccess {String} Services.Type type of the services
 * @apiSuccess {String} Services.Title title of the services
 */
router.get('/getStationServicesById/:id', function (req, res) {
	var output;
	var language = langHelper.getRequestedLanguage(req);
	db.sql(conv_i18n("select st.Description Type, stt.Title[_lang]",language) +
		" from ServiceStation ss\
		join ServiceStationAttribute ssa\
		on ss.Id = ssa.StationId\
		join StaticType st\
		on ssa.StaticTypeId = st.TypeID\
		join Static stt\
		on ssa.StaticTypeNumber = stt.TypeNumber and ssa.StaticTypeId = stt.TypeID\
		where ss.id = @id")
		.parameter('id', TYPES.Char, req.params.id)
		.execute()
		.then(function (results) {
			output = {'Id':req.params.id};
			output.Services = results;
			return res.json(output);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});


module.exports = router;
