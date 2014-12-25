var path = require('path');
var root = path.resolve(__dirname, '..');

module.exports = {
  root: root,
  bower: root + '/bower_components',
  generated: root + '/generated',
  'public': root + '/public',
  views: root + '/views',
  tasks: root + '/tasks',
  vendor: root + '/vendor',
  node: root + '/node_modules',
  app: root + '/app'
};
