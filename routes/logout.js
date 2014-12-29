var router = module.exports = require('express').Router();

router.get('/', function(req, res, next) {
  res.clearCookie('member', { path: '/' });
  res.redirect(302, '/');
});
