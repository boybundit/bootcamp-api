/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');

var app = require('../src/app.js');
	
describe('Static Endpoint', function () {
	describe('GET /api/statics/vehicles', function () {
		it('should respond with the list of vehicles', function (done) {
			request(app)
				.get('/api/statics/vehicles')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.greaterThan(0);
					done();
				});
		});
	});
	
	describe('GET /api/statics/foods', function () {
		it('should respond with the list of foods', function (done) {
			request(app)
				.get('/api/statics/foods')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.greaterThan(0);
					done();
				});
		});
	});
	
	describe('GET /api/statics/facilities', function () {
		it('should respond with the list of facilities', function (done) {
			request(app)
				.get('/api/statics/facilities')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.greaterThan(0);
					done();
				});
		});
	});
	
});
