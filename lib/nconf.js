var nconf = require('nconf');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var crypto = require('crypto');

exports.init = function() {
  // nconf file paths relative to pwd NOT __dirname
  nconf.argv().env().file({ file: './config/' + env + '.json' });
  nconf.set('env', env);
  return nconf;
};
