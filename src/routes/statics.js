var express = require('express');
var router  = express.Router();
var db = require('../database');
var sqlHelper = require('../lib/sql-helper');

var VEHICLE_TYPE = 1;
var FOOD_TYPE = 2;
var FACILITY_TYPE = 3;

var getStatic = function(req, res, type) {
  db.sql(sqlHelper.conv_i18n('SELECT Title[_lang] from Static WHERE TypeID = ' + type + ';','th'))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
}

/**
 * @api {get} /api/vehicles Get all available vehicle types
 * @apiName GetVehicles
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/vehicles', function(req, res) {
  getStatic(VEHICLE_TYPE);
});

/**
 * @api {get} /api/foods Get all available food types
 * @apiName GetFoods
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/foods', function(req, res) {
  getStatic(FOOD_TYPE);
});

/**
 * @api {get} /api/facilities Get all available facility types
 * @apiName GetFacilities
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/facilities', function(req, res) {
  getStatic(FACILITY_TYPE);
});

/**
 * @api {get} /api/fuels Get all available fuel types
 * @apiName GetFuels
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/fuels', function(req, res) {
  res.json([
    // TODO: Retrive from DB Fuel table
    {id: 1, title: 'E20'},
    {id: 2, title: 'E85'},
    {id: 3, title: 'Gasohol 95'},
    {id: 4, title: 'Diesel'}
  ]);
});

module.exports = router;
