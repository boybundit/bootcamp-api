/*jslint node: true*/
'use strict';

var app = require('./app.js');

app.listen(process.env.PORT || 3000, function () {
	console.log('Server is started.');
});
