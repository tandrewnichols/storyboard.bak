var router = module.exports = require('express').Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var oneYear = 365*24*60*60*1000
var crypto = require('crypto');

var neoResponseCallback = function(res, err, author) {
  if (err) res.sendError(err);
  else res.status(200).json(author.get());
};

var cookie = function(res, author) {
  res.cookie('member', author.encrypt(), { path: '/', maxAge: oneYear });
  res.status(200).json(author.get());
};

router.post('/:id', function(req, res, next) {
  var loggedInId = req.models.Author.decrypt(req.cookies.member);
  if (loggedInId !== req.params.id) res.status(403).end();
  else req.models.Author.findOne({ uid: req.params.id }).update(_.omit(req.body, 'id'), neoResponseCallback.bind(null, res));
}); 

router.post('/', function(req, res, next) {
  var data = {
    penname: req.body.penname,
    email: req.body.email
  };
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      data.password = hash;
      req.models.Author.create(data, function(err, author) {
        if (err) res.sendError(err);
        else cookie(res, author);
      });
    });
  } else {
    res.status(400).end();
  }
});

router.get('/', function(req, res, next) {
  if (req.query.email) {
    req.models.Author.findOne({ email: req.query.email }, function(err, author) {
      if (err) {
        res.sendError(err);
      } else {
        if (req.query.password && author) {
          bcrypt.compare(req.query.password, author.data.password, function(err, match) {
            if (err) res.sendError(err);
            else if (!match) res.sendError('Invalid pen name or password.');
            else cookie(res, author, author);
          });
        } else if (author) {
          res.status(200).json(author.get());
        } else {
          res.status(404).end();
        }
      }
    });
  } else if (req.cookies.member) {
    req.models.Author.findOne({ uid: req.models.Author.decrypt(req.cookies.member) }, neoResponseCallback.bind(null, res));
  } else {
    res.status(404).end();
  }
});

router.put('/:id', function(req, res, next) {
  var loggedInId = req.models.Author.decrypt(req.cookies.member);
  if (loggedInId !== req.params.id) res.status(403).end();
  else if (req.body.email) {
    req.models.Author.findOne({ email: req.body.email }, function(err, author) {
      if (err) res.sendError(err);
      else if (author) res.status(400).json({ error: 'That email is already registered.' });
      else {
        req.models.Author.findOne({ uid: req.params.id }).update({ email: req.body.email }, neoResponseCallback.bind(null, res));
      }
    });
  } else if (req.body.oldPw) {
    req.models.Author.findOne({ uid: req.params.id }, function(err, author) {
      if (err) res.sendError(err);
      else if (author) {
        bcrypt.compare(req.body.oldPw, author.password, function(err, match) {
          if (err) res.sendError(err);
          else if (!match) res.sendError('Invalid password.');
          else if (req.body.newPw === req.body.confirm) {
            bcrypt.hash(req.body.newPw, 10, function(err, hash) {
              author.update({ password: hash }, neoResponseCallback.bind(null, res));
            });
          } else res.sendError('The new passwords do not match.');
        });
      }
    });
  } else {
    req.models.Author.findOne({ uid: req.params.id }).update(_.omit(req.body, 'id'), neoResponseCallback.bind(null, res));
  }
});
