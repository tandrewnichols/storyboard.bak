angular.module('app')
  .filter('titleize', function() {
    return function(str) {
      return _.titleize(str);
    };
  });
