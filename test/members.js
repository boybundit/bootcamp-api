/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');

var app = require('../src/app.js');
	
describe('Members Endpoint', function () {
	describe('GET /api/members/1', function () {
		it('should respond with MemberID=1', function (done) {
			request(app)
				.get('/api/members/1')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					expect(res.body.MemberID).to.eql('1');
					done();
				});
		});
	});
	
});
