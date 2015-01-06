var router = module.exports = require('express').Router();
var _ = require('lodash');

// Create a new world
router.post('/', function(req, res, next) {
  req.models.Story.create(_.omit(req.body, 'world'), function(err, story) {
    if (err) res.sendError(err);
    else {
      req.author.createRelationTo(story, 'CREATED', function(err, rel) {
        if (err) res.sendError(err);
        else if (req.body.world) {
          story.createRelationBetween(world, 'WITHIN', function(err, rel) {
            res.status(200).json(story.data);  
          });
        } else {
          res.status(200).json(story.data);
        }
      });
    }
  });
});

// Get all stories on all worlds for a user
router.get('/', function(req, res, next) {
  if (req.author) {
    req.Graph.start().match('(n:Author)-[:CREATED]->(s:Story)').match('(n:Author)-[:CREATED]->(:World)-[:WITHIN]-(s:Story)').return('s').orderBy('s.createdTime').limit(5, function(err, nodes) {
      if (err) res.sendError(err);
      else res.status(200).json(_.pluck(nodes, 'data'));
    });
  } else {
    res.status(404).end();
  }
});
