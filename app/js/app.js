angular.module('app', ['ngResource', 'ui.router', 'ngRoute', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']).run(function($rootScope) {
  $rootScope.patterns = {
    email: /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
  };
});
