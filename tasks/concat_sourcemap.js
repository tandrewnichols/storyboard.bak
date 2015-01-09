module.exports = {
  dev: {
    options: {
      sourcesContent: true
    },
    src: ['<%= files.js %>', 'generated/js/template-cache.js', 'app/js/bootstrap.js'],
    dest: 'generated/js/app.js'
  },
  dist: {
    src: ['<%= files.js %>', 'public/js/template-cache.js', 'app/js/bootstrap.js'],
    dest: 'public/js/app.js'
  }
};
