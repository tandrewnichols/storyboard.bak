var router = module.exports = require('express').Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var uuid = require('uuid');

router.post('/', function(req, res, next) {
  var data = {
    penname: req.body.penname,
    email: req.body.email,
    id: uuid.v4()
  };
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      data.password = hash;
      req.graph.insertNode(data, 'AUTHOR', function(err, node) {
        if (err) {
          next(err);
        } else {
          res.status(200).json(_.pick(data, 'penname', 'email', 'id'));
        }
      });
    });
  } else {
    res.status(400).end();
  }
});
