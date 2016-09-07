var express = require('express');
var router  = express.Router();
var sqlHelper = require('../lib/sql-helper.js');

/**
 * @api {get} /api/users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', function(req, res) {
  res.json({ message: 'Returns all users.',
	           sql: sqlHelper.conv_i18n('select mytext[_lang], id, caption[_lang] from tab;','th')
						});
  // db.sql("SELECT * FROM Test")
  // .execute()
  // .then(function (results) {
  //   res.json(results);
  // }).fail(function (err) {
  //   res.status(404).json(err);
  // });
});

module.exports = router;
