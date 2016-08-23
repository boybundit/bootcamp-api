/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect');
var request = require('supertest');

var app = require('../src/app.js');

describe('Book Service', function () {
	describe('GET /api/book', function () {
		it('should respond with json', function (done) {
			request(app)
				.get('/api/book')
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
});
