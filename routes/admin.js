var router = module.exports = require('express').Router();
var _ = require('lodash');

router.get('/labels', function(req, res, next) {
  req.Graph.query("match (n:Author)-[]->(o) where n.uid = '" + req.author.data.uid + "' return distinct labels(o)", function(err, labels) {
    if (err) next(err);
    else if (labels) res.status(200).json(_.chain(labels.data).flatten().uniq().value());
    else res.status(200).json([]);
  });
});

router.delete('/nodes/:label?', function(req, res, next) {
  var other = req.params.label ? ':' + req.params.label : ''; 
  req.Graph.query("match (author:Author)-[created]->(child" + other + ")-[rels*0..]-(gchild" + other + ") where author.uid = '" + req.author.data.uid + "' foreach(rel in rels | delete rel) delete created, child, gchild", function(err) {
    if (err) res.sendError(err);
    else res.status(200).end();
  })
});
