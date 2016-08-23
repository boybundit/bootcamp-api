/*jslint node: true*/
'use strict';

var express = require('express');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var app = express();

//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	return res.json({ hello: 'world' });
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

module.exports = app;
