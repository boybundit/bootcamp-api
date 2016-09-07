/**
 * @functionName conv_i18n
 *
 * @functionParam {String} sql SQL statement with tag [_lang].
 * @functionParam {String} lang Language of the result ( "en" or "th" ). 
 *
 * @functionSuccess {String} sql SQL statement with replaced fieldnames.
 */
exports.conv_i18n = function(sql,lang) {
  return sql.replace(/([A-Za-z0-9_@#]*)\[_lang\]/g , '$1_'+lang+' $1');
}

//-- Call function
// conv_i18n('select ID,StationName[_lang], Test1, Caption[_lang] from ServiceStation;','en')
//-- output
// select ID,StationName_en StationName, Test1, Caption_en Caption from ServiceStation;