var router = module.exports = require('express').Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.end();
});
