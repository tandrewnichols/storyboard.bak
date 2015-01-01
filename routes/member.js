var router = module.exports = require('express').Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var uuid = require('uuid');
var crypt = require('../lib/crypt');
var oneYear = 365*24*60*60*1000

var neoResponseCallback = function(res, err, nodes) {
  if (err) res.sendError(err);
  else res.status(200).json(_.omit(nodes[0], 'password'));
};

var cookie = function(res, node) {
  res.cookie('member', crypt.encrypt(node.id), { path: '/', maxAge: oneYear });
  res.status(200).json(_.omit(node, 'password'));
};

router.post('/:id', function(req, res, next) {
  var loggedInId = crypt.decrypt(req.cookies.member);
  if (loggedInId !== req.params.id) res.status(403).end();
  else req.graph.update('AUTHOR', { id: req.params.id }, _.omit(req.body, 'id'), neoResponseCallback.bind(null, res));
}); 

router.post('/', function(req, res, next) {
  var data = {
    penname: req.body.penname,
    email: req.body.email,
    id: uuid.v4()
  };
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      data.password = hash;
      req.graph.add(data, 'AUTHOR', function(err, node) {
        if (err) res.sendError(err);
        else cookie(res, node);
      });
    });
  } else {
    res.status(400).end();
  }
});

router.get('/', function(req, res, next) {
  if (req.query.email) {
    req.graph.find('AUTHOR', { email: req.query.email }, function(err, nodes) {
      if (err) {
        res.sendError(err);
      } else {
        if (req.query.password && nodes[0]) {
          var pending = nodes[0];
          bcrypt.compare(req.query.password, pending.password, function(err, match) {
            if (err) res.sendError(err);
            else if (!match) res.sendError('Invalid pen name or password.');
            else cookie(res, pending, pending);
          });
        } else {
          res.status(200).json(_.omit(nodes[0], 'password'));
        }
      }
    });
  } else if (req.cookies.member) req.graph.find('AUTHOR', { id: crypt.decrypt(req.cookies.member) }, neoResponseCallback.bind(null, res));
  else res.status(404).end();
});

router.put('/:id', function(req, res, next) {
  var loggedInId = crypt.decrypt(req.cookies.member);
  if (loggedInId !== req.params.id) res.status(403).end();
  else if (req.body.email) {
    req.graph.find('AUTHOR', { email: req.body.email }, function(err, nodes) {
      if (err) res.sendError(err);
      else if (nodes.length) res.status(400).json({ error: 'That email is already registered.' });
      else req.graph.update('AUTHOR', { id: req.params.id }, { email: req.body.email }, neoResponseCallback.bind(null, res));
    });
  } else if (req.body.oldPw) {
    req.graph.find('AUTHOR', { id: req.params.id }, function(err, nodes) {
      if (err) res.sendError(err);
      else if (nodes[0]) {
        var pending = nodes[0];
        bcrypt.compare(req.body.oldPw, pending.password, function(err, match) {
          if (err) res.sendError(err);
          else if (!match) res.sendError('Invalid password.');
          else if (req.body.newPw === req.body.confirm) {
            bcrypt.hash(req.body.newPw, 10, function(err, hash) {
              req.graph.update('AUTHOR', { id: req.params.id }, { password: hash }, neoResponseCallback.bind(null, res));
            });
          } else res.sendError('The new passwords do not match.');
        });
      }
    });
  } else {
    req.graph.update('AUTHOR', { id: req.params.id }, _.omit(req.body, 'id'), neoResponseCallback.bind(null, res));
  }
});
