/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect');
var request = require('supertest');

var app = require('../src/app.js');
describe('Promotions Endpoint', function () {
	describe('GET /api/promotions', function () {
		it('should respond with json', function (done) {
			this.timeout(10000);
			request(app)
				.get('/api/promotions')
				.set('Accept', 'application/json')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					console.log(res.text);
					done();
				});
		});
	});
});
