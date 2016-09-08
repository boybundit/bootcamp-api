var express = require('express');
var router  = express.Router();
var db = require('../database');
var sqlHelper = require('../lib/sql-helper');

router.VEHICLE_TYPE = 1;
router.FOOD_TYPE = 2;
router.FACILITY_TYPE = 3;
router.FUEL_TYPE = 4;

var getRequestLanguage = function(req) {
	var acceptLanguage = require('accept-language');
	acceptLanguage.languages(['en-US', 'th-TH']);
	var language = req.get('Accept-Language');
	language = acceptLanguage.get(language);
	language = language.substring(0, 2);
	//console.log(language);
	return language;
}

var getStatic = function(req, res, type) {
  var language = getRequestLanguage(req);
  db.sql(sqlHelper.conv_i18n('SELECT TypeNumber, Title[_lang] from Static WHERE TypeID = ' + type + ';', language))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}

/**
 * @api {get} /api/statics/vehicles Get all available vehicle types
 * @apiName GetVehicles
 * @apiGroup Statics
 *
 * @apiSuccess {List} vehicles List of all available vehicle types
 */
router.get('/vehicles', function(req, res) {
  getStatic(req, res, router.VEHICLE_TYPE);
});

/**
 * @api {get} /api/statics/foods Get all available food types
 * @apiName GetFoods
 * @apiGroup Statics
 *
 * @apiSuccess {List} foods List of all available food types
 */
router.get('/foods', function(req, res) {
  getStatic(req, res, router.FOOD_TYPE);
});

/**
 * @api {get} /api/statics/facilities Get all available facility types
 * @apiName GetFacilities
 * @apiGroup Statics
 * @apiHeader {String} Accept-Language Prefered languages. (Accept-Language: th)
 *
 * @apiSuccess {List} facilities List of all available facility types
 */
router.get('/facilities', function(req, res) {
  getStatic(req, res, router.FACILITY_TYPE);
});

/**
 * @api {get} /api/statics/fuels Get all available fuel types
 * @apiName GetFuels
 * @apiGroup Statics
 *
 * @apiSuccess {List} fuels List of all available fuel types
 */
router.get('/fuels', function(req, res) {
  getStatic(req, res, router.FUEL_TYPE);
});

module.exports = router;
