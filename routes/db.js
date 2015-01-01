var router = module.exports = require('express').Router();
var _ = require('lodash');

router.get('/query/labels', function(req, res, next) {
  req.graph.query('MATCH n RETURN DISTINCT labels(n)', function(err, nodes) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(_.chain(nodes.data).flatten().uniq().value());
    }
  });
});

router.get('/dump/:label?', function(req, res, next) {
  var node = req.params.label ? '(n:`' + req.params.label.toUpperCase() + '`)' : 'n';
  req.graph.query('MATCH ' + node + ' DELETE n', function(err, nodes) {
    if (err) {
      res.sendError(err);
    } else {
      res.status(200).end();
    }
  })
});
