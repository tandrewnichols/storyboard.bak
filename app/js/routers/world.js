angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('main.world', {
      url: '/world/:slug',
      templateUrl: 'world/index.html',
      controller: 'World'
    });
});
