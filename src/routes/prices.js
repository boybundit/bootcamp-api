var express = require('express');
var router  = express.Router();
var db = require('../database');
var staticsRouter = require('../routes/statics');
var sqlHelper = require('../lib/sql-helper');
var langHelper = require('../lib/lang-helper');

/**
 * @api {get} /api/prices Get prices of all fuel types
 * @apiName GetFuelPrices
 * @apiGroup Prices
 * @apiHeader {String} Accept-Language Prefered languages. (Accept-Language: th)
 *
 * @apiSuccess {Object[]} fuelPrices List of fuel with pricing information
 * @apiSuccess {Number} fuelPrices.ID ID of fuel type
 * @apiSuccess {String} fuelPrices.Title Name of fuel type
 * @apiSuccess {Float} fuelPrices.Price Current price of fuel type
 */
router.get('/', function(req, res) {
  console.log(langHelper);
  var language = langHelper.getRequestedLanguage(req);
  db.sql(sqlHelper.conv_i18n('SELECT FP.ID, FP.Price, S.Title[_lang] from FuelPrice FP join Static S on FP.ID = S.TypeNumber where S.TypeID = ' + staticsRouter.FUEL_TYPE + ';', language))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
});

module.exports = router;
