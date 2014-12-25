module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'app/img',
        src: '**/*.{jpg,png,gif}',
        dest: 'generated/img/'
      }
    ]
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'app/img',
        src: '**/*.{jpg,png,gif}',
        dest: 'public/img/'
      }
    ]
  }
};
