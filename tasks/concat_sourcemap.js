module.exports = {
  dev: {
    options: {
      sourcesContent: true
    },
    src: ['<%= files.js %>', 'generated/template-cache.js'],
    dest: 'generated/app.js'
  },
  dist: {
    src: ['<%= files.js %>', 'public/template-cache.js'],
    dest: 'public/app.js'
  }
};
