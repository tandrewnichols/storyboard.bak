module.exports = {
  options: {
    overwrite: false
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts',
        src: ['*'],
        dest: 'public/fonts'
      },
      {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts',
        src: ['*'],
        dest: 'public/fonts'
      },
      {
        expand: true,
        cwd: 'fonts',
        src: ['*'],
        dest: 'public/fonts'
      }
    ]
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts',
        src: ['*'],
        dest: 'generated/fonts'
      },
      {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts',
        src: ['*'],
        dest: 'generated/fonts'
      },
      {
        expand: true,
        cwd: 'fonts',
        src: ['*'],
        dest: 'generated/fonts'
      }
    ]
  }
};
