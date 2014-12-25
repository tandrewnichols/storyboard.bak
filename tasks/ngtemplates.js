module.exports = {
  options: {
    module: 'app'
  },
  dev: {
    cwd: "app/templates",
    src: "**/*.html",
    dest: "generated/template-cache.js"
  },
  dist: {
    cwd: "app/templates",
    src: "**/*.html",
    dest: "public/template-cache.js"
  }
};
