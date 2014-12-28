var nconf = require('nconf');
var neoconf = nconf.get('neo4j');
var neo = require('neo4j');
var db = new neo.GraphDatabase(neoconf.connection);

exports.init = function(req, res, next) {
  
};
