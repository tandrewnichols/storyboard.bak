var crypto = require('crypto');
var util = require('util');
var _ = require('lodash');
var nconf = require('nconf');
var async = require('async');

module.exports = {
  instance: {
    fields: {
      indexes: {
        email: true
      },
      defaults: {
        theme: 'spacelab',
        inverse: true
      },
      unique: {
        email: true
      }
    },

    /*
     * Override base implementation to leave password out
     */
    toJson: function() {
      return _.omit(this.data, 'password');
    },

    /*
     * Encrypt the current user's uid
     */
    encrypt: function() {
      return module.exports.static.encrypt(this.data.uid);
    },

    /*
     * Decrypt the current user's uid
     */
    decrypt: function() {
      return module.exports.static.decrypt(this.data.uid);
    },

    /*
     * Change an author's email and corresonding gravatar
     */
    changeEmail: function(email, cb) {
      return this.update({ email: email, gravatar: module.exports.static.gravatar(email) }, cb);
    },

    /*
     * Get all nodes connected by relationship "type"
     */
    getAllByType: function(type, limit, cb) {
      if (typeof limit === 'function') {
        cb = limit;
        limit = 5;
      }
      var query = this.Graph.start().match('(a:Author)-[:CREATED]->(n:' + type + ')').where({ 'a.uid': this.data.uid }).return('n').orderBy('n.createdDate')
      if (limit) { 
        query.limit(limit, cb);
      } else {
        query.exec(cb);
      }
    },

    /*
     * Determine whether a node is connected to this node, at any length
     */
    canEdit: function(node, level, cb) {
      if (typeof level === 'function') {
        cb = level;
        level = null;
      }
      if (typeof node === 'object') node = node.data.uid;

      // If the author is editing his/her own profile, allow it
      if (this.data.uid === node) cb(null, this);
      else {
        // Otherwise, if the author created the node...
        var matches = ['(a)-[:CREATED]->(created {uid: uid})'];
        // Or a level of access was provided and the author has that level
        if (level) {
          matches.push('(a)-[r:HAS_ACCESS]->(access {uid: uid})');
        }
        // Or the node is marked as public
        matches.push('(public {uid: uid, access: \'public\'})');
        // Execute the query with parameterized value
        this.Graph.query('match ' + matches.join(',') + ' where a.uid = ' + this.data.uid + ' limit 1 return created, access, public').addParameters({ uid: node }).exec(cb);
      }
    }
  },
  static: {
    /*
     * Encrypt the text passed in
     */
    encrypt: function(text) {
      // Create a random initialization vector
      var iv = new Buffer(crypto.randomBytes(16));
      // Create a cypher using a set cypher key and the above iv
      var cipher = crypto.createCipheriv('AES-256-CBC', new Buffer(nconf.get('cipherKey')), iv);
      // Set output to hex
      cipher.setEncoding('hex');
      // Encrypt the text
      cipher.write(text);
      cipher.end();
      // Get the full encrypted cypher out
      var cipherText = cipher.read();
      // Create a sha hash using a set hmac key
      var hmac = crypto.createHmac('SHA256', nconf.get('hmacKey'));
      // Hash the cipher
      hmac.update(cipherText);
      // Hash the hexified iv
      hmac.update(iv.toString('hex'));
      // Concat the cipher, hex iv, and sha digest with '$' so it can be decrypted later
      return [cipherText, iv.toString('hex'), hmac.digest('hex')].join('$');
    },

    /*
     * Decrypt the cipher passed in
     */
    decrypt: function(cipher) {
      // Split out the parts of the hash
      var cipherBlob = cipher.split('$');
      // Get the cipher, iv, and hash digest
      var cipherText = cipherBlob[0];
      var iv = new Buffer(cipherBlob[1], 'hex');
      var hmacDigest = cipherBlob[2];
      // Work backward to regenerate the hash digest in the same way so they can be compared
      var hmac = crypto.createHmac('SHA256', nconf.get('hmacKey'));
      hmac.update(cipherText);
      hmac.update(iv.toString('hex'));

      // Compare the original hash and the one here to prevent tamporing
      if (!module.exports.static.compare(hmacDigest, hmac.digest('hex'))) return null; 
      else {
        // Decipher the original value with the same iv
        var decipher = crypto.createDecipheriv('AES-256-CBC', new Buffer(nconf.get('cipherKey')), iv);
        var decrypted = decipher.update(cipherText, 'hex', 'utf8');
        return decrypted + decipher.final('utf8');
      }
    },

    /*
     * Used by decrypt to determine if 2 hashes are the same
     */
    compare: function(orig, cmp) {
      var sentinel;
      if (orig.length !== cmp.length) return false;
      // Loop over the hash and compare the bytes
      for (var i = 0; i <= (orig.length - 1); i++) {
        sentinel |= orig.charCodeAt(i) ^ cmp.charCodeAt(i);
      }
      return sentinel === 0;
    },

    /*
     * Create a gravatar src for a given email
     */
    gravatar: function(node) {
      // Gravatar requires a md5 hex hash of the email
      var md5 = crypto.createHash('md5');
      if (typeof node === 'object') {
        md5.update(node.data.email);
      } else if (typeof node === 'string') {
        md5.update(node);
      }
      return util.format('http://www.gravatar.com/avatar/%s?d=mm', md5.digest('hex'));
    },
  }
};
