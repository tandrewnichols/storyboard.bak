var nconf = require('nconf');
var neoconf = nconf.get('neo4j');
var neo4j = require('node-neo4j');
var db = new neo4j(neoconf.connection);

module.exports = function(req, res, next) {
  req.graph = db;
  req.graph.add = req.graph.insertNode;
  req.graph.addLabel = req.graph.addLabelsToNode;
  req.graph.deleteLabel = req.graph.deleteLabelFromNode;
  req.graph.find = function(label, props, cb) {
    if (typeof props === 'function') {
      req.graph.readNodesWithLabel(label, props);
    } else {
      req.graph.readNodesWithLabelsAndProperties(label, props, cb);
    }
  };
  req.graph.update = req.graph.updateNodesWithLabelsAndProperties;
  req.graph.remove = req.graph.deleteNodesWithLabelsAndProperties;
  req.graph.query = req.graph.cypherQuery;
  next();
};
