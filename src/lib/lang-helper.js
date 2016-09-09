/**
 * @functionName getRequestedLanuage
 *
 * @functionParam {Request} request HTTP request object
 *
 * @functionSuccess {String} language Language prefered by request
 */
exports.getRequestedLanguage = function(req) {
  var acceptLanguage = require('accept-language');
  acceptLanguage.languages(['en-US', 'th-TH']);
  var language = req.get('Accept-Language');
  language = acceptLanguage.get(language);
  language = language.substring(0, 2);
  //console.log(language);
  return language;
}
