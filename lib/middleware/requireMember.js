module.exports = function(req, res, next) {
  if (!req.author) {
    res.status(200).end();
  } else {
    next();
  }
};
