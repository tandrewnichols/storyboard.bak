angular.module('app', ['ngResource', 'ui.router', 'ngRoute', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']).run(function($rootScope, $state, Redirect) {
  $rootScope.state = $state;
  _.mixin(_.string);
  _.mixin(_._safe);
  $rootScope.patterns = {
    email: /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
  };

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error.config.method === 'GET' && error.config.url === '/api/author' && error.status === 404 && toState.access === 'member') {
      Redirect.to = {
        state: toState,
        params: toParams
      };
      Redirect.waitFor = 'main.login';
      $state.go('main.login');
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (Redirect.to.state && fromState.name === Redirect.waitFor) {
      delete Redirect.waitFor;
      $state.go(Redirect.to.state.name, Redirect.to.params || {});
      Redirect.to = {};
    }
  });
});
