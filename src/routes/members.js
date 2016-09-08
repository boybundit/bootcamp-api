var express = require('express');
var router  = express.Router();
var db = require('../database.js');
var TYPES = require('tedious').TYPES;

/**
 * @api {get} /api/members/:id/:point Request Member information
 * @apiName members
 * @apiGroup members
 *
 * @apiParam {String} id MemberID.
 * @apiParam {int} points  
 *
 * @apiSuccess {String} MemberID MemberID.
 * @apiSuccess {String} Level Membership level.
 * @apiSuccess {String} PointNeeded Points needed for next redemption.
 * @apiSuccess {String} Preferences Preferences.
 * @apiSuccess {String} TypeID Type Number.
 * @apiSuccess {String} Description TypeID description.
 * @apiSuccess {String} TypeNumber Type Number.
 * @apiSuccess {String} Title(lang) Preference.
 */
router.get('/:id/:point', function (req, res) {
	console.log(req.params.id);
	console.log(req.params.point);
		
	var point = 500;
	//Cal point needs
	var pointNeeded = point - (req.params.point % point);
	var output;
	db.sql("Select Member.MemberID, MemberLevel.level \
			from Member \
			join MemberLevel \
			on MemberLevel.MinPoint <= @point and MemberLevel.MaxPoint >= @point \
			where Member.MemberID = @id")
		.parameter('point', TYPES.Int, req.params.point)
		.parameter('id', TYPES.Char, req.params.id)
		.execute()
		.then(function (result1) {
			console.log(result1);
			output = result1;
			db.sql("Select MemberPreference.TypeID, StaticType.description, MemberPreference.TypeNumber, Static.Title_en, Static.Title_th \
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
					.then(function (result2) {
						console.log(result2);
						output.Preference = result2;
						console.log(output);
						
						//var x = { preference: result2 };
						//return res.json(x);
						//output[preference] = result2;
						//output.add(result2);
						var o = {
							Member: result1,
							PointNeeded: pointNeeded,
							Preference: result2
						};
						return res.json(o);
					}).fail(function (err) {
						return res.status(404).json(err);
					})
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

module.exports = router;