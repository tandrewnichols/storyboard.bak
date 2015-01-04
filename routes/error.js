module.exports = function(err, req, res, next) {
  if (err instanceof Error) {
    res.render('error', { description: err.message, stack: err.stack });
  } else {
    res.render('error', { description: err, stack: new Error().stack });
  }
};
