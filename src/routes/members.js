/*jslint node: true, es5: true*/
'use strict';

var Promise = require("bluebird");
var express = require('express');
var router  = express.Router();
var db = require('../database.js');
var TYPES = require('tedious').TYPES;
var sqlHelper = require('../lib/sql-helper');

var getRequestLanguage = function (req) {
	var acceptLanguage = require('accept-language'),
		language = req.get('Accept-Language');
	acceptLanguage.languages(['en-US', 'th-TH']);
	language = acceptLanguage.get(language);
	language = language.substring(0, 2);
	return language;
};

/**
 * @api {get} /api/members/:id/?point=:point Request member information
 * @apiName GetMembers
 * @apiGroup Members
 * @apiHeader {String} Accept-Language Prefered languages
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Language": "th"
 *     }
 * @apiParam {String}	id		Member ID
 * @apiParam {Number}	point	Current point
 *
 * @apiSuccess {String}		MemberID				Member ID
 * @apiSuccess {String}		Level					Membership level
 * @apiSuccess {Number}		PointTarget				Points target for next redemption
 * @apiSuccess {Number}		PointNeeded				Points needed for next redemption
 * @apiSuccess {Object[]}	Preferences				Preferences
 * @apiSuccess {String}		Preferences.TypeID		Category ID
 * @apiSuccess {String}		Preferences.Description	Category description
 * @apiSuccess {String}		Preferences.TypeNumber	Choice ID
 * @apiSuccess {String}		Preferences.Title		Choice title
  */
router.get('/:id', function (req, res) {

	var id = req.params.id,
		point = +req.query.point || 0,
		pointStep = 500,
		pointNeeded = pointStep - (point % pointStep),
		pointTarget = pointNeeded + point,
		output,
		language = getRequestLanguage(req),
		query1,
		query2;
		
	query1 = 'Select Member.MemberID, MemberLevel.Level \
		from Member \
		join MemberLevel \
		on MemberLevel.MinPoint <= @point and MemberLevel.MaxPoint >= @point \
		where Member.MemberID = @id';
	
	query2 = 'Select MemberPreference.TypeID, StaticType.Description, MemberPreference.TypeNumber, Static.Title[_lang] \
		from Member \
		join MemberPreference \
		on Member.MemberID = MemberPreference.MemberID \
		join Static \
		on MemberPreference.TypeID = Static.typeID and MemberPreference.TypeNumber = Static.TypeNumber \
		join staticType \
		on MemberPreference.TypeID = StaticType.TypeID \
		where Member.memberID = @id';
	query2 = sqlHelper.conv_i18n(query2, language);

	db.sql(query1)
		.parameter('point', TYPES.Int, point)
		.parameter('id', TYPES.Char, id)
		.execute()
		.then(function (result1) {
			//console.log(result1);
			db.sql(query2)
				.parameter('id', TYPES.Char, id)
				.execute()
				.then(function (result2) {
					//console.log(result2);
					output = result1[0];
					output.PointTarget = pointTarget;
					output.PointNeeded = pointNeeded;
					output.Preference = result2;
					return res.json(output);
				}).fail(function (err) {
					return res.status(404).json(err);
				});
		}).fail(function (err) {
			return res.status(404).json(err);
		});
	/*
	db.sql("Select Member.MemberID, MemberPreference.TypeID, StaticType.description, MemberPreference.TypeNumber, Static.Title_en, Static.Title_th \
			from Member \
			join MemberPreference \
			on Member.MemberID = MemberPreference.MemberID \
			join Static \
			on MemberPreference.TypeID = Static.typeID and MemberPreference.TypeNumber = Static.TypeNumber \
			join staticType \
			on MemberPreference.TypeID = StaticType.TypeID \
			where Member.memberID = @id")
		.parameter('id',TYPES.Char, req.params.id)
		.execute()
		.then(function (results) {
			//memberPreference = json(results);
			//console.log(results);
			//return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});	
	*/
	/*
	var needPoint = Number.MAX_VALUE;
	var nextPoint = Number.MAX_VALUE;
	
	db.sql("SELECT * FROM Reward ORDER BY point DESC")
		.forEachRow(function(row) {
			
			
			if (Math.ceil(req.params.point / row.point) * row.point - req.params.point < needPoint) {
				needPoint = Math.ceil(req.params.point / row.point) * row.point - req.params.point;
				//nextPoint = Math.ceil(req.params.point / row.point) * row.point;
				console.log(needPoint);
			}
		})
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});	
	
	*/
	
	
	/*
	db.sql("SELECT Member.FirstName, Member.Points, MemberLevel.Level, Format(Member.MemberSince,'MMM dd, yyyy') as MemberSince, Member.PreferredFuel, FuelPrice.Price \
			FROM Member \
			LEFT JOIN FuelPrice \
			ON Member.PreferredFuel=FuelPrice.Fuel \
			LEFT JOIN MemberLevel \
			ON Member.Points >= MemberLevel.MinPoint and Member.Points <= MemberLevel.MaxPoint \
			WHERE MemberID = @id")
		.parameter('id', TYPES.Char, req.params.id)
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});	
	*/
});


/**
 * @api {post} /api/members/:id/ Update member information
 * @apiName PostMembers
 * @apiGroup Members
 * @apiHeader {String} Accept-Language Prefered languages
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Accept-Language": "th"
 *     }
 *
 * @apiParam {Object[]}		Preferences				Preferences
 * @apiParam {String}		Preferences.TypeID		Category ID
 * @apiParam {String}		Preferences.TypeNumber	Choice ID
 * @apiParamExample {json} Request-Example:
 *     {
 *       "Preference": [
 *         {
 *           "TypeID": 1,
 *           "TypeNumber": 1
 *         },
 *         {
 *           "TypeID": 1,
 *           "TypeNumber": 2
 *         }
 *       ]
 *     }
 * @apiSuccess {String}		MemberID				Member ID
 * @apiSuccess {String}		Level					Membership level
 * @apiSuccess {Number}		PointTarget				Points target for next redemption
 * @apiSuccess {Number}		PointNeeded				Points needed for next redemption
 * @apiSuccess {Object[]}	Preferences				Preferences
 * @apiSuccess {String}		Preferences.TypeID		Category ID
 * @apiSuccess {String}		Preferences.Description	Category description
 * @apiSuccess {String}		Preferences.TypeNumber	Choice ID
 * @apiSuccess {String}		Preferences.Title		Choice title
 * 
 * @apiSampleRequest off
 */
router.post('/:id', function (req, res) {
	var id = req.params.id,
		query1,
		query2;
	query1 = 'DELETE FROM MemberPreference \
		WHERE MemberID = @id';
	query2 = 'INSERT INTO MemberPreference (MemberID, TypeID, TypeNumber) \
		VALUES (@id, @typeId, @typeNumber)';
	db.sql(query1)
		.parameter('id', TYPES.Char, id)
		.execute()
		.then(function (result1) {
			return Promise.map(req.body.Preference, function (preference) {
				return db.sql(query2)
					.parameter('id', TYPES.Char, id)
					.parameter('typeId', TYPES.Char, preference.TypeID)
					.parameter('typeNumber', TYPES.Char, preference.TypeNumber)
					.execute();
			});
		})
		.then(function (result2) {
			return res.redirect('./' + id);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

module.exports = router;