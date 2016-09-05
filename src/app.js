/*jslint node: true, es5: true*/
'use strict';

var express = require('express');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var db = require('./database');
var api = express.Router();

var app = express();

//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add new route here.
var usersRouter = require('./routes/users');
api.use('/users', usersRouter);

var stationsRouter = require('./routes/stations');
api.use('/stations', stationsRouter);

app.use('/api', api);

app.get('/', function (req, res) {
	return res.redirect('/doc/index.html');
});

app.get('/mocha', function (req, res) {
	return res.redirect('/mocha/index.html');
});

module.exports = app;
