var path = require('path');
var cp = require('child_process');
var server;

var kill = function() {
  console.log('Stopping express server');
  server.kill();
};

module.exports = function(grunt, context) {
  grunt.registerTask('server', 'Start the express server', function() {
    var done = this.async();
    if (server) {
      console.log('Restarting the express server');
      server.kill('SIGKILL');
      process.removeListener('exit', kill);
    } else {
      console.log('Starting the express server');
    }
    process.on('exit', kill);
    server = cp.spawn('node', ['app'], { cwd: context.paths.root });
    server.stdout.on('data', function(data) {
      var str = data.toString();
      if (str.indexOf('Express server listening') > -1) {
        done();
      }
      console.log(str.replace('\n', ''));
    });
  });
};
