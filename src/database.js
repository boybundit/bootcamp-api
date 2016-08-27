/*jslint node: true*/
var tp = require('tedious-promises');

tp.setConnectionConfig({
	"userName": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"server": process.env.DB_SERVER || 'bootcamp-dev.database.windows.net',
	"options": {
		"database": process.env.DB_DATABASE || 'bootcamp-dev',
		"encrypt": true
	}
});

module.exports = tp;
