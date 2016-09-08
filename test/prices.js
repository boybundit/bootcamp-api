/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');

var app = require('../src/app.js');

describe('Price Endpoint', function () {
	describe('GET /api/prices', function () {
		it('should respond with the list of fuel prices', function (done) {
			request(app)
				.get('/api/prices')
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
