var express = require('express');
var router  = express.Router();
var db = require('../database');
var TYPES = require('tedious').TYPES;

/**
 * @api {get} /api/users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', function(req, res) {
  res.json({ message: 'Returns all stations.'});
});

router.get('/:lat,:long', function (req, res) {
	db.sql("SELECT TOP(10) * \
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
