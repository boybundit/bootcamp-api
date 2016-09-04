var express = require('express');
var router  = express.Router();

/**
 * @api {get} /api/vehicles Get all available vehicle types
 * @apiName GetVehicles
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/vehicles', function(req, res) {
  res.json([
    {id: 1, title: 'Car'},
    {id: 2, title: 'Truck'},
    {id: 3, title: 'Motorbike'},
  ]);
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
    {id: 1, title: 'E20'},
    {id: 2, title: 'E85'},
    {id: 3, title: 'Gasohol 95'},
    {id: 4, title: 'Diesel'}
  ]);
});

/**
 * @api {get} /api/milages Get all available milage ranges
 * @apiName GetMilages
 * @apiGroup Statics
 *
 * @apiSuccess {String} test What is test?
 */
router.get('/milages', function(req, res) {
  res.json([
    {id: 1, title: '< 200'},
    {id: 2, title: '>= 200'},
  ]);
});

module.exports = router;
