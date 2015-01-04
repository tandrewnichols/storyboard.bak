var uuid = require('uuid');
var gravatar = 'http://www.gravatar.com/avatar/%s?d=mm';
var crypto = require('crypto');
var util = require('util');
var _ = require('lodash');
var crypt = require('../lib/crypt');

module.exports = {
  instance: {
    fields: {
      indexes: {
        email: true,
        uid: true
      },
      defaults: {
        createdTime: function() {
          return Date.now();
        },
        theme: 'spacelab',
        inverse: true,
        uid: uuid.v4,
        gravatar: function(node) {
          var md5 = crypto.createHash('md5');
          md5.update(node.data.email);
          return util.format(gravatar, md5.digest('hex'));
        }
      },
      unique: {
        email: true,
        uid: true
      }
    },
    get: function() {
      return _.omit(this.data, 'password');
    },
    encrypt: function() {
      return crypt.encrypt(this.data.uid);
    },
    decrypt: function() {
      return crypt.decrypt(this.data.uid);
    }
  },
  static: {
    encrypt: crypt.encrypt,
    decrypt: crypt.decrypt
  }
};
