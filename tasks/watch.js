module.exports = {
  less: {
    files: ['app/css/**/*.less'],
    tasks: ['less:dev']
  },
  server: {
    files: ['app.js', 'routes/**/*.js', 'lib/**/*.js', 'views/**/*.html'],
    tasks: ['server'],
    options: {
      spawn: false
    }
  },
  tasks: {
    files: ['tasks/**/*.js'],
    tasks: ['clean', 'copy:dev', 'ngtemplates:dev', 'concat_sourcemap:dev', 'ngAnnotate:dev', 'less:dev', 'server'],
    options: {
      spawn: false
    }
  },
  js: {
    files: ['app/js/**/*.js', 'app/templates/**/*.html'],
    tasks: ['ngtemplates:dev', 'concat_sourcemap:dev', 'ngAnnotate:dev']
  }
};
