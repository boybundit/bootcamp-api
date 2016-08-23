/*jslint node: true*/
'use strict';

var express = require('express');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	return res.json({ hello: 'world' });
});

app.get('/api/book', function (req, res) {
	return res.json({ book: 1 });
});

app.listen(process.env.PORT || 80, function () {
	console.log('Server is started.');
	console.log('DB Server   = bootcamp-dev.database.windows.net');
	console.log('DB Database = bootcamp-dev');
	console.log('DB Username = ' + process.env.DB_USERNAME);
	console.log('DB Password = ' + process.env.DB_PASSWORD);
});
