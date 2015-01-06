module.exports = function(req, res, next) {
  req.isAjax = true;
  next();
};
