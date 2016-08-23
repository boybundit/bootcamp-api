/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect');
var request = require('supertest');

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1, 2, 3].indexOf(4));
		});
	});
});

describe('GET /users', function () {
	it('respond with json', function (done) {
		request(app)
			.get('/users')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				done();
		});
	});
});
