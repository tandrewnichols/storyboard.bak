module.exports = {
  dev: ['copy:dev', 'symlink:dev', 'jade:dev', 'less:dev'],
  dist: ['copy:dist', 'symlink:dist', 'jade:dist', 'less:dist']
};
