var router = module.exports = require('express').Router();
var _ = require('lodash');

// Create a new world
router.post('/', function(req, res, next) {
  var nodes = [
    { model: req.models.Story, data: _.omit(req.body, 'world') },
    { model: req.models.World, data: req.body.world || { name: 'Earth' }, func: 'findOrCreate' }
  ];

  req.Node.createNodes(nodes, function(err, nodes) {
    if (err) res.sendError(err);
    else {
      var story = nodes[0];
      var world = nodes[1];
      var rels = [
        { to: story, from: req.author, type: 'CREATED' },
        { to: story, from: world, type: 'HAS' }
      ];
      if (req.body.world) rels.push({ to: world, from: req.author, type: 'CREATED' });

      req.Node.createRelations(rels, function(err, rels) {
        if (err) res.sendError(err);
        else res.status(200).json({ story: story.data, world: world.data, rels: _.pluck(rels.data) });
      });
    }
  });
});

// Get all stories on all worlds for a user
router.get('/', function(req, res, next) {
  req.author.getAll('Story', function(err, nodes) {
    if (err) res.sendError(err);
    else res.status(200).json(_.pluck(nodes, 'data'));
  });
});
