var express = require('express');
var router  = express.Router();
var db = require('../database');
var sqlHelper = require('../lib/sql-helper');
var langHelper = require('../lib/lang-helper');

/**
 * @api {get} /api/promotions Get all active promotions
 * @apiName GetPromotions
 * @apiGroup Promotions
 *
 * @apiSuccess {Number} PromotionID ID of promotion
 * @apiSuccess {Number} LayoutID ID of layout to render the promotion
 * @apiSuccess {String} Header Header of the promotion
 * @apiSuccess {String} Body Body of the promotion
 * @apiSuccess {String} ImgCaption1 Caption of Image #1
 * @apiSuccess {String} ImgURL1 URL of Image #1
 * @apiSuccess {String} ImgLink1 Link URL if click at Image #1
 * @apiSuccess {String} ImgCaption2 Caption of Image #2
 * @apiSuccess {String} ImgURL2 URL of Image #2
 * @apiSuccess {String} ImgLink2 Link URL if click at Image #2
 * @apiSuccess {String} ImgCaption3 Caption of Image #3
 * @apiSuccess {String} ImgURL3 URL of Image #3
 * @apiSuccess {String} ImgLink3 Link URL if click at Image #3
 */
router.get('/', function(req, res) {
	var language = langHelper.getRequestedLanguage(req);
  db.sql(sqlHelper.conv_i18n(
	  'SELECT PromotionID, LayoutID, Header[_lang], Body[_lang],' +
		'ImgCaption1[_lang], ImgURL1[_lang], ImgLink1[_lang],' +
		'ImgCaption2[_lang], ImgURL2[_lang], ImgLink2[_lang],' +
		'ImgCaption3[_lang], ImgURL3[_lang], ImgLink3[_lang]' +
		' from Promotion' +
    '	WHERE ValidFrom <= GetDate() and ValidUntil >= GetDate()' +
    '	order by priority, ValidFrom desc;'
		,language))
  .execute()
  .then(function (results) {
    res.json(results);
  }).fail(function (err) {
    res.status(404).json(err);
  });
});

module.exports = router;
