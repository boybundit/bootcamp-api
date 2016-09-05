var express = require('express');
var router  = express.Router();

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
  res.json({ message: 'Returns all stations.'});
});

module.exports = router;
