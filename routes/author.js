var router = module.exports = require('../lib/middleware/neo4j').models.Author.router;
var bcrypt = require('bcrypt');
var _ = require('lodash');
var oneYear = 365*24*60*60*1000
var crypto = require('crypto');
var requireMember = require('../lib/middleware/requireMember');

var neoResponseCallback = function(res, err, author) {
  if (err) res.sendError(err);
  else res.status(200).json(author.toJson());
};

var cookie = function(res, author) {
  res.cookie('author', author.encrypt(), { path: '/', maxAge: oneYear });
  res.status(200).json(author.toJson());
};

/*
 * Create a new author
 */
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
        else {
          res.cookie('author', author.encrypt(), { path: '/', maxAge: oneYear });
          res.status(200).json(author.toJson());
        }
      });
    });
  } else {
    res.status(400).end();
  }
});

/*
 * Lookup an author by email, login an author, or return the currently logged in member
 */
router.get('/', function(req, res, next) {
  if (req.query.email) {
    // Check where an email is in use or login
    req.models.Author.findOne({ email: req.query.email }, function(err, author) {
      if (err) next(err);
      else if (req.query.password && author) {
        // We have a password and an email, so log try to log the user in
        bcrypt.compare(req.query.password, author.data.password, function(err, match) {
          if (err) next(err);
          else if (!match) res.sendError('Invalid pen name or password.');
          else {
            res.cookie('author', { path: '/', maxAge: oneYear });
            res.status(200).json(author.toJson());
          }
        });
      } else if (author) {
        // Member trying to join but email already exists
        res.status(403).end();
      } else {
        // No member with this email address
        res.status(404).end();
      }
    });
  } else if (req.cookies.author) {
    // Return currently logged in author
    res.status(200).json(req.author.toJson());
  } else {
    res.status(404).json({ description: 'Not Found' });
  }
});

//router.put('/:id', requireMember, function(req, res, next) {
  //if (req.author.uid !== req.params.id) res.status(403).end();
  //else if (req.body.email) {
    //req.models.Author.findOne({ email: req.body.email }, function(err, author) {
      //if (err) res.sendError(err);
      //else if (author) res.status(400).json({ error: 'That email is already registered.' });
      //else req.author.changeEmail(req.body.email, neoResponseCallback.bind(null, res));
    //});
  //} else if (req.body.oldPw && req.author) {
    //bcrypt.compare(req.body.oldPw, req.author.data.password, function(err, match) {
      //if (err) res.sendError(err);
      //else if (!match) res.sendError('Invalid password.');
      //else if (req.body.newPw === req.body.confirm) {
        //bcrypt.hash(req.body.newPw, 10, function(err, hash) {
          //author.update({ password: hash }, neoResponseCallback.bind(null, res));
        //});
      //} else res.sendError('The new passwords do not match.');
    //});
  //} else {
    //req.author.update(_.omit(req.body, 'id'), neoResponseCallback.bind(null, res));
  //}
//});
