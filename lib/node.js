var async = require('async');
var uuid = require('uuid');

module.exports = function(db) {
  return {
    proto: {
      // Set up default fields every child node type should have
      fields: {
        indexes: {
          uid: true
        },
        unique: {
          uid: true
        },
        defaults: {
          createdTime: function() {
            return Date.now();
          },
          uid: uuid.v4
        }
      },

      // Add the graph to the node instanace
      Graph: db.Graph,

      // Create multiple relationships at the same time.
      // Call as node.createRelations('OWNS', sock, 'WANTS', secondSock, 'NEEDS', twoFeet, cb)
      createRelations: function() {
        var self = this;
        var args = [].slice.call(arguments);
        var cb = args.pop();
        _.chain(args).chunk(2).each(function(set) {
          db.Node.createUniqueRelation(self, set[1], set[0], cb);
        });
      },

      // Only create the relationship if it does not already exist
      createUniqueRelation: function(to, type, cb) {
        if (_.isArray(to)) {
          var arr = to;
          type = arr[0];
          to = arr[1];
        }
        db.Node.createUniqueRelations(this, to, type, cb);
      },

      // Generic toJson function that returns the data object
      toJson: function() {
        return this.data;
      }
    },

    // Add additional static methods to the Node class
    static: {
      // Create multiple nodes at the same time.
      // Call as Model.createNodes(Sock, { side: 'left' }, Shoe, { side: 'right' }, cb)
      createNodes: function() {
        var args = [].slice.call(arguments);
        var cb = args.pop();
        async.map(_.chain(args).chunk(2), function(set, next) {
          set[0].findOrCreate(set[1], next);
        }, cb);
      },

      // Create multiple relationships at the same time.
      // Call as Model.createRelations(foo, 'HAS', bar, baz, 'WANTS', quux, cb)
      createRelations: function() {
        var args = [].slice.call(arguments);
        var cb = args.pop();
        async.map(_.chain(args).chunk(3), function(set, next) {
          set[0].createUniqueRelation(set[2], set[1], next);
        }, cb);
      },

      // Only create a relationship if it does not already exist
      createUniqueRelation: function(from, to, type, cb) {
        db.Graph.start().match('(a:' + from.label + '),(b:' + to.label + ')').where({ 'a.uid': from.data.uid, 'b.uid': to.data.uid }).createUnique('(a)-[r:CREATED]->(b)').return('r', cb);
      },

      // Look up a node by unique id 
      getOne: function(uid, cb) {
        return db.Node.find({ uid: uid }).limit(1, cb);
      },

      /*
       * Request handler to get single resource by uid
       */
      get: function(req, res, next) {
        this.getOne(req.params.id, function(err, node) {
          if (err) res.sendError(err);
          else if (!node) res.status(404).json({ description: 'Not Found' });
          else res.status(200).json(node.toJson());
        });
      },

      /*
       * Request handler to update a single resource by uid
       */
      put: function(req, res, next) {
        req.queriedNode.update(req.body, function(err, node) {
          if (err) res.sendError(err);
          else if (!node) res.status(404).json({ description: 'Not Found' });
          else res.status(200).json(node.toJson());
        });
      },

      /*
       * Reqeust handler to update a field on a single resource by uid
       */
      post: function(req, res, next) {
        this.find({ uid: req.params.uid }).limit(1).update(req.body, function(err, node) {
          if (err) res.sendError(err);
          else if (!node) res.status(404).json({ description: 'Not Found' });
          else res.status(200).json(node.toJson());
        });
      },

      /*
       * Request handler to delete a single resouce by uid
       */
      del: function(req, res, next) {
        this.Graph.query('match (n)-[r]-() where n.uid = ' + req.params.uid + ' delete r, n', function(err, node) {
          if (err) res.sendError(err);
          else res.status(200).end();
        });
      }
    }
  };
};
