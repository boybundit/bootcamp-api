/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');

var app = require('../src/app.js');

var member1 = '7800764800000006309';
var member2 = '7800764800010136955';
var member3 = '7800764800000102199';
	
describe('Members Endpoint', function () {
	//1. Test Member 7800764800000006309 
	describe('GET /api/members/7800764800000006309', function () {
		it('should respond with MemberID=7800764800000006309', function (done) {
			request(app)
				.get('/api/members/7800764800000006309')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.MemberID).to.eql('7800764800000006309');
					done();
				});
		});
	});
	//2. Test MemberLevel case1: 200 using 7800764800000006309
	describe('GET /api/members/7800764800000006309?point=200', function () {
		it('should respond with Level=Bronze, PointTarget=500 and PointNeeded=300', function (done) {
			request(app)
				.get('/api/members/7800764800000006309?point=200')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.Level).to.eql('Bronze');
					expect(res.body.PointTarget).to.eql(500);
					expect(res.body.PointNeeded).to.eql(300);
					done();
				});
		});
	});
	//3. Test MemberLevel case2: 400 using 7800764800010136955
	describe('GET /api/members/7800764800010136955?point=400', function () {
		it('should respond with Level=Bronze, PointTarget=500 and PointNeeded=100', function (done) {
			request(app)
				.get('/api/members/7800764800010136955?point=400')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.Level).to.eql('Silver');
					expect(res.body.PointTarget).to.eql(500);
					expect(res.body.PointNeeded).to.eql(100);
					done();
				});
		});
	});
	//4. Test MemberLevel case2: 650 using 7800764800000102199
	describe('GET /api/members/7800764800000102199?point=650', function () {
		it('should respond with Level=Bronze, PointTarget=1000 and PointNeeded=350', function (done) {
			request(app)
				.get('/api/members/7800764800000102199?point=650')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.Level).to.eql('Gold');
					expect(res.body.PointTarget).to.eql(1000);
					expect(res.body.PointNeeded).to.eql(350);
					done();
				});
		});
	});
	//5. Test Preference Case1: Preference for 7800764800000006309
	describe('GET /api/members/7800764800000006309?point=1000', function () {
		it('should respond with 7800764800000006309\'s preference ', function (done) {
			request(app)
				.get('/api/members/7800764800000006309?point=1000')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.Preference[0].TypeID).to.eql(1);
					expect(res.body.Preference[0].Description).to.eql('Vehicle');
					expect(res.body.Preference[0].TypeNumber).to.eql(1);
					expect(res.body.Preference[0].Title).to.eql('Car');
					
					expect(res.body.Preference[1].TypeID).to.eql(1);
					expect(res.body.Preference[1].Description).to.eql('Vehicle');
					expect(res.body.Preference[1].TypeNumber).to.eql(2);
					expect(res.body.Preference[1].Title).to.eql('Van');
					
					expect(res.body.Preference[2].TypeID).to.eql(2);
					expect(res.body.Preference[2].Description).to.eql('Food');
					expect(res.body.Preference[2].TypeNumber).to.eql(1);
					expect(res.body.Preference[2].Title).to.eql('Fried Chicken');
					
					expect(res.body.Preference[3].TypeID).to.eql(2);
					expect(res.body.Preference[3].Description).to.eql('Food');
					expect(res.body.Preference[3].TypeNumber).to.eql(2);
					expect(res.body.Preference[3].Title).to.eql('Sushi');
					
					expect(res.body.Preference[4].TypeID).to.eql(3);
					expect(res.body.Preference[4].Description).to.eql('Facility');
					expect(res.body.Preference[4].TypeNumber).to.eql(2);
					expect(res.body.Preference[4].Title).to.eql('Lube change & garage services');
					
					expect(res.body.Preference[5].TypeID).to.eql(3);
					expect(res.body.Preference[5].Description).to.eql('Facility');
					expect(res.body.Preference[5].TypeNumber).to.eql(3);
					expect(res.body.Preference[5].Title).to.eql('Toilet');
					
					expect(res.body.Preference[6].TypeID).to.eql(3);
					expect(res.body.Preference[6].Description).to.eql('Facility');
					expect(res.body.Preference[6].TypeNumber).to.eql(4);
					expect(res.body.Preference[6].Title).to.eql('Mini-mart');
										
					expect(res.body.Preference[7].TypeID).to.eql(4);
					expect(res.body.Preference[7].Description).to.eql('Fuel');
					expect(res.body.Preference[7].TypeNumber).to.eql(2);
					expect(res.body.Preference[7].Title).to.eql('Gasohol 95');
					
					done();	
				});
		});
	});
	
	
	
	
	//Test Th language
	
	
	//Test Post
	describe('POST /api/members/1', function () {
		it('should update preference of MemberID=1', function (done) {
			request(app)
				.post('/api/members/1')
				.send({
					"Preference": [
						{ "TypeID": 1, "TypeNumber": 1 },
						{ "TypeID": 1, "TypeNumber": 2 }
					]
				})
				.expect(302)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					done();
				});
		});
	});
	
	
	
	
});
