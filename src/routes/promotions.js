var express = require('express');
var router  = express.Router();
var db = require('../database');
var sqlHelper = require('../lib/sql-helper');

/**
 * @api {get} /api/promotion Get all active promotions
 * @apiName GetPromotions
 * @apiGroup Promotion
 *
 * @apiSuccess {String} header Header of the promotion.
 * @apiSuccess {String} body HTML tags for Body of the promotion.
 */
router.get('/', function(req, res) {
  db.sql(sqlHelper.conv_i18n('SELECT Header[_lang], Body[_lang] from Promotion WHERE ValidFrom <= GetDate() and ValidUntil >= GetDate() order by priority, ValidFrom desc;','th'))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
});

module.exports = router;
