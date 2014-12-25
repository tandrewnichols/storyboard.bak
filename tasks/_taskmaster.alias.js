module.exports = {
  'default': ['clean', 'copy:dev', 'ngtemplates:dev', 'concat_sourcemap:dev', 'ngAnnotate:dev', 'less:dev', 'server', 'watch'],
  build: ['clean', 'copy:dist', 'ngtemplates:dist', 'concat_sourcemap:dist', 'ngAnnotate:dist', 'uglify:dist', 'less:dist']
};
