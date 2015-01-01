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
      'public/css/app.slate.css': 'app/css/main.slate.less',
      'public/css/app.sandstone.css': 'app/css/main.sandstone.less',
      'public/css/app.spacelab.css': 'app/css/main.spacelab.less',
      'public/css/app.cerulean.css': 'app/css/main.cerulean.less',
      'public/css/app.darkly.css': 'app/css/main.darkly.less',
      'public/css/app.flatly.css': 'app/css/main.flatly.less'
    }
  },
  dev: {
    files: {
      'generated/css/app.slate.css': 'app/css/main.slate.less',
      'generated/css/app.sandstone.css': 'app/css/main.sandstone.less',
      'generated/css/app.spacelab.css': 'app/css/main.spacelab.less',
      'generated/css/app.cerulean.css': 'app/css/main.cerulean.less',
      'generated/css/app.darkly.css': 'app/css/main.darkly.less',
      'generated/css/app.flatly.css': 'app/css/main.flatly.less'
    }
  }
};
