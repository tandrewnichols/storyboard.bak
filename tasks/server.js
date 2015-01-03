var path = require('path');
var cp = require('child_process');
var chalk = require('chalk');
var server;

module.exports = function(grunt, context) {
  var kill = function() {
    grunt.log.writeln('Stopping express server');
    server.kill();
  };

  grunt.registerTask('server', 'Start the express server', function() {
    var done = this.async();
    if (server) {
      grunt.log.writeln('Restarting the express server');
      server.kill('SIGKILL');
      process.removeListener('exit', kill);
    } else {
      grunt.log.writeln('Starting the express server');
    }
    process.on('exit', kill);
    server = cp.spawn('node', ['app'], { cwd: context.paths.root });
    server.stdout.on('data', function(data) {
      var str = data.toString();
      if (str.indexOf('Express server listening') > -1) {
        done();
      }
      grunt.log.write(str);
    });
    server.stderr.on('data', function(data) {
      var d = data.toString();
      grunt.log.write(d);
      if (d.indexOf('Error: connect ECONNREFUSED') > -1) {
        grunt.log.writeln();
        grunt.log.writeln(chalk.red('Maybe the neo4j server is not running?'));
      }
      done();
    });
  });
};
