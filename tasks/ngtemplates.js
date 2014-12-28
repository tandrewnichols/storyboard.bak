module.exports = {
  options: {
    module: 'app'
  },
  dev: {
    cwd: "generated/templates",
    src: "**/*.html",
    dest: "generated/js/template-cache.js"
  },
  dist: {
    cwd: "public/templates",
    src: "**/*.html",
    dest: "public/js/template-cache.js"
  }
};
