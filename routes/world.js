var router = module.exports = require('express').Router();
var _ = require('lodash');

// Create a new world
router.post('/', function(req, res, next) {
  req.models.World.create(req.body, function(err, world) {
    if (err) res.sendError(err);
    else {
      req.author.createRelationTo(world, 'CREATED', function(err, rel) {
        if (err) res.sendError(err);
        else res.status(200).json(world.data);
      });
    }
  });
});

// Get ALL worlds associated with this user
router.get('/', function(req, res, next) {
  if (req.author) {
    req.Graph.start().match('(n:Author)-[r:CREATED]->(w:World)').return('w').orderBy('w.createdTime').limit(5, function(err, nodes) {
      if (err) res.sendError(err);
      else res.status(200).json(_.pluck(nodes, 'data'));
    });
  } else {
    res.status(404).end();
  }
});
