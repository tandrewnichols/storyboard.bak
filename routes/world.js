var router = module.exports = require('express').Router();

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
