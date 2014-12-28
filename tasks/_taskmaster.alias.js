module.exports = {
  'default': ['clean', 'concurrent:dev', 'ngtemplates:dev', 'concat_sourcemap:dev', 'ngAnnotate:dev', 'server', 'watch'],
  build: ['clean', 'concurrent:dist', 'ngtemplates:dist', 'concat_sourcemap:dist', 'ngAnnotate:dist', 'uglify:dist']
};
