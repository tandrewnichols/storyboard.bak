var router = module.exports = require('express').Router();
var crypt = require('../lib/crypt');

router.get('*', function(req, res) {
  if (req.cookies.member) {
    var id = crypt.decrypt(req.cookies.member);
    req.graph.readNodesWithLabelsAndProperties('AUTHOR', { id: id }, function(err, results) {
      res.render('home', { member: results[0] });
    });
  } else {
    res.render('home', {});
  }
});
