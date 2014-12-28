module.exports = {
  options: {
    sourceMap: true,
    outputSourceFiles: true,
    sourceMapURL: function(dest) {
      return '/assets/css/' + dest.split('/').pop() + '.map';
    }
  },
  dist: {
    options: {
      cleancss: true
    },
    files: {
      'public/css/app.dark.css': 'app/css/main.dark.less',
      'public/css/app.light.css': 'app/css/main.light.less'
    }
  },
  dev: {
    files: {
      'generated/css/app.dark.css': 'app/css/main.dark.less',
      'generated/css/app.light.css': 'app/css/main.light.less'
    }
  }
};
