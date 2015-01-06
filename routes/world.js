var router = module.exports = require('express').Router();

// Create a new world
router.post('/', function(req, res, next) {
  res.status(200).end();
});
