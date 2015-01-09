angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('main.world', {
      url: '/build/world/:slug',
      templateUrl: 'world/index.html',
      controller: 'World'
    });
});
