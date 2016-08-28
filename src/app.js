/*jslint node: true, es5: true*/
'use strict';

var express = require('express');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var db = require('./database.js');

var app = express();

//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	return res.redirect('/doc/index.html');
});

app.get('/mocha', function (req, res) {
	return res.redirect('/mocha/index.html');
});

/**
 * @api {get} /api/book/:id Request Book information
 * @apiName GetBook
 * @apiGroup Book
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
app.get('/api/book', function (req, res) {
	return res.json({ book: 1 });
});

/**
 * @api {get} /api/test/:id Request Test information
 * @apiName GetTest
 * @apiGroup Test
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
app.get('/api/test', function (req, res) {
	db.sql("SELECT * FROM Test")
		.execute()
		.then(function (results) {
			return res.json(results);
		}).fail(function (err) {
			return res.status(404).json(err);
		});
});

module.exports = app;
