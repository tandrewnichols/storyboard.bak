module.exports = function(err, req, res, next) {
  var data = {
    description: err instanceof Error ? err.message : err,
    stack: err instanceof Error ? err.stack : new Error().stack
  };

  if (req.isAjax) {
    res.status(500).json(data);
  } else {
    res.render('error', data);
  }
};
