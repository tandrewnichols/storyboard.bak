angular.module('app', ['ngResource', 'ui.router', 'ngRoute', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']).run(function($rootScope, $state) {
  $rootScope.state = $state;
  _.mixin(_.string);
  _.mixin(_._safe);
  $rootScope.patterns = {
    email: /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
  };
});
