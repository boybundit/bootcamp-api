var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Returns all users.'});
  // db.sql("SELECT * FROM Test")
  // .execute()
  // .then(function (results) {
  //   res.json(results);
  // }).fail(function (err) {
  //   res.status(404).json(err);
  // });
});

module.exports = router;
