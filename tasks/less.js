module.exports = {
  dist: {
    options: {
      cleancss: true,
      sourceMap: true
    },
    files: {
      'public/app.css': 'app/css/main.less'
    }
  },
  dev: {
    files: {
      'generated/app.css': 'app/css/main.less'
    }
  }
};
