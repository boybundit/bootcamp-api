/*jslint node: true*/
/*global describe, it*/
'use strict';

var assert = require('assert');
var expect = require('expect');
var request = require('supertest');
var sqlHelper = require('../src/lib/sql-helper');

var app = require('../src/app.js');
// sql: sqlHelper.conv_i18n('select mytext[_lang], id, caption[_lang] from tab;','th')
describe('Users Endpoint', function () {
	describe('Test sql-helper', function () {
		it('should respond with sql string', function (done) {
			assert.equal('select t.mytext_th mytext, t.id, t.caption1_th caption1 from tab t;', 
			             sqlHelper.conv_i18n('select t.mytext[_lang], t.id, t.caption1[_lang] from tab t;','th'));
			done();
		});
	});
});
