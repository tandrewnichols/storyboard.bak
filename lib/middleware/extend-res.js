module.exports = function(req, res, next) {
  res.sendError = function(err) {
    res.status(500).json({ error: (err instanceof Error ? err.message : err) });
  };
  next();
};
