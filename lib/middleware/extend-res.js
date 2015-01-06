module.exports = function(req, res, next) {
  res.sendError = function(err) {
    res.status(500).json({ description: (err instanceof Error ? err.message : err), stack: (err instanceof Error ? err.stack : new Error().stack)});
  };
  next();
};
