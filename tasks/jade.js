module.exports = {
  options: {
    filters: require('../lib/filters'),
    namespace: false
  },
  dev: {
    options: {
      pretty: true
    },
    files: [
      {
        expand: true,
        cwd: 'app/templates/',
        ext: '.html',
        src: '**/*.jade',
        dest: 'generated/templates/'
      }
    ]
  },
  dist: {
    options: {
      compileDebug: false,
      debug: false
    },
    files: [
      {
        expand: true,
        cwd: 'app/templates/',
        ext: '.html',
        src: '**/*.jade',
        dest: 'public/templates/'
      }
    ]
  }
};
