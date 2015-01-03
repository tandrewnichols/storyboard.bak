var uuid = require('uuid');
var gravatar = 'http://www.gravatar.com/avatar/%s?d=mm';
var crypto = require('crypto');
var util = require('util');

module.exports = {
  fields: {
    indexes: {
      email: true,
      id: true
    },
    defaults: {
      createdTime: function() {
        return Date.now();
      },
      theme: 'spacelab',
      inverse: false, 
      id: uuid.v4
    },
    unique: {
      email: true,
      id: true
    },
    gravatar: function() {
      var md5 = crypto.createHash('md5');
      md5.update(this.data.email);
      return util.format(gravatar, md5.digest('hex'));
    }
  }
};
