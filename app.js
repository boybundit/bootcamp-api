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

app.get('/api/book', function (req, res) {
	return res.json({ book: 1 });
});

module.exports = app;
