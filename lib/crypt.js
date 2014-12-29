var nconf = require('nconf');
var crypto = require('crypto');

var compare = function(orig, cmp) {
  var sentinel;

  if (orig.length !== cmp.length) {
    return false;
  }

  for (var i = 0; i <= (orig.length - 1); i++) {
    sentinel |= orig.charCodeAt(i) ^ cmp.charCodeAt(i);
  }

  return sentinel === 0;
};

exports.encrypt = function(text) {
  var iv = new Buffer(crypto.randomBytes(16));
  var cipher = crypto.createCipheriv('AES-256-CBC', new Buffer(nconf.get('cipherKey')), iv);
  cipher.setEncoding('hex');
  cipher.write(text);
  cipher.end();
  var cipherText = cipher.read();
  var hmac = crypto.createHmac('SHA256', nconf.get('hmacKey'));
  hmac.update(cipherText);
  hmac.update(iv.toString('hex'));
  return [cipherText, iv.toString('hex'), hmac.digest('hex')].join('$');
};

exports.decrypt = function(cipher) {
  var cipherBlob = cipher.split('$');
  var cipherText = cipherBlob[0];
  var iv = new Buffer(cipherBlob[1], 'hex');
  var hmacDigest = cipherBlob[2];
  var hmac = crypto.createHmac('SHA256', nconf.get('hmacKey'));
  hmac.update(cipherText);
  hmac.update(iv.toString('hex'));

  if (!compare(hmacDigest, hmac.digest('hex'))) {
    return null; 
  } else {
    var decipher = crypto.createDecipheriv('AES-256-CBC', new Buffer(nconf.get('cipherKey')), iv);
    var decrypted = decipher.update(cipherText, 'hex', 'utf8');
    return decrypted + decipher.final('utf8');
  }
};
