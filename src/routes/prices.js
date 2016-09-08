var express = require('express');
var router  = express.Router();
var db = require('../database');
var staticsRouter = require('../routes/statics');
var sqlHelper = require('../lib/sql-helper');

var getRequestLanguage = function(req) {
	var acceptLanguage = require('accept-language');
	acceptLanguage.languages(['en-US', 'th-TH']);
	var language = req.get('Accept-Language');
	language = acceptLanguage.get(language);
	language = language.substring(0, 2);
	//console.log(language);
	return language;
}

/**
 * @api {get} /api/prices/fuels Get prices of all fuel types
 * @apiName GetFuelPrices
 * @apiGroup Prices
 *
 * @apiSuccess {Object[]} fuelPrices List of fuel with pricing information
 * @apiSuccess {Number} fuelPrices.ID ID of fuel type
 * @apiSuccess {String} fuelPrices.Title Name of fuel type
 * @apiSuccess {Float} fuelPrices.Price Current price of fuel type
 */
router.get('/', function(req, res) {
  var language = getRequestLanguage(req);
  db.sql(sqlHelper.conv_i18n('SELECT FP.ID, FP.Price, S.Title[_lang] from FuelPrice FP join Static S on FP.ID = S.TypeNumber where S.TypeID = ' + staticsRouter.FUEL_TYPE + ';', language))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
});

module.exports = router;
