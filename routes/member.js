var router = module.exports = require('express').Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var uuid = require('uuid');
var crypt = require('../lib/crypt');
var oneYear = 365*24*60*60*1000

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
          res.sendError(err);
        } else {
          res.cookie('member', crypt.encrypt(data.id), { path: '/', maxAge: oneYear });
          res.status(200).json(_.pick(data, 'penname', 'email', 'id'));
        }
      });
    });
  } else {
    res.status(400).end();
  }
});

router.get('/', function(req, res, next) {
  if (req.query.penname) {
    req.graph.readNodesWithLabelsAndProperties('AUTHOR', { penname: req.query.penname }, function(err, results) {
      if (err) {
        res.sendError(err);
      } else {
        if (req.query.password && results[0]) {
          var pending = results[0];
          bcrypt.compare(req.query.password, pending.password, function(err, match) {
            if (err) {
              res.sendError(err);
            } else if (!match) {
              res.sendError('Invalid pen name or password.');
            } else {
              res.cookie('member', crypt.encrypt(pending.id), { path: '/', maxAge: oneYear });
              res.status(200).json(pending);
            }
          });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  } else if (req.cookies.member) {
    var id = crypt.decrypt(req.cookies.member);
    req.graph.readNodesWithLabelsAndProperties('AUTHOR', { id: id }, function(err, results) {
      if (err) {
        res.sendError(err);
      } else {
        res.status(200).json(results[0]);
      }
    });
  }
});
