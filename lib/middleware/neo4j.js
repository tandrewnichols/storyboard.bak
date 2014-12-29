var nconf = require('nconf');
var neoconf = nconf.get('neo4j');
var neo4j = require('node-neo4j');
var db = new neo4j(neoconf.connection);

module.exports = function(req, res, next) {
  req.graph = db;
  next();
};
