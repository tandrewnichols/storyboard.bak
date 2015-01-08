var router = module.exports = require('express').Router();
var _ = require('lodash');

router.get('/query/labels', function(req, res, next) {
  req.author.allRelations(function(err, labels) {
    console.log(labels);
    if (err) next(err);
    else if (nodes) res.status(200).json(labels);
    else res.status(200).json([]);
  });
});

router.get('/dump/:label?', function(req, res, next) {
  req.author.allRelations(req.params.label).delete('r, n', function(err, nodes) {
    if (err) res.sendError(err);
    else res.status(200).end();
  })
});
