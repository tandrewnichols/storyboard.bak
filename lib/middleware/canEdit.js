module.exports = function(level) {
  return function(req, res, next) {
    if (req.author) {
      req.author.canEdit(req.params.uid, level, function(err, node) {
        if (err) res.sendError(err);
        else if (!(nodes && nodes.length)) res.status(403).json({ description: 'Forbidden' });
        else {
          req.queriedNode = node;
          next();
        }
      });
    } else {
      rest.status(403).json({ description: 'Forbidden' });
    }
  }
};
