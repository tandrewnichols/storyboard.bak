var router = module.exports = require('express').Router();
var _ = require('lodash');

router.get('*', function(req, res) {
  if (req.cookies.member) {
    req.models.Author.findOne({ uid: req.models.Author.decrypt(req.cookies.member) }, function(err, author) {
      res.render('index', { member: author.get() });
    });
  } else {
    res.render('index', {});
  }
});
