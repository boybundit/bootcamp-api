/*jslint node: true*/
'use strict';

var app = require('./app.js');

app.listen(process.env.PORT || 80, function () {
	console.log('Server is started.');
	console.log('DB Server   = bootcamp-dev.database.windows.net');
	console.log('DB Database = bootcamp-dev');
	console.log('DB Username = ' + process.env.DB_USERNAME);
	console.log('DB Password = ' + process.env.DB_PASSWORD);
});
