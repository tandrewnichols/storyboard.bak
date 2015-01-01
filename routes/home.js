var router = module.exports = require('express').Router();
var crypt = require('../lib/crypt');
var _ = require('lodash');

router.get('*', function(req, res) {
  if (req.cookies.member) {
    req.graph.find('AUTHOR', { id: crypt.decrypt(req.cookies.member) }, function(err, nodes) {
      res.render('index', { member: _.omit(nodes[0], 'password') });
    });
  } else {
    res.render('index', {});
  }
});
