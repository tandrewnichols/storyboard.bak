var extend = require('config-extend');

module.exports = function(req, res, next) {
  extend(res.locals, {
    pageComponents: {}
  });
  next();
};
