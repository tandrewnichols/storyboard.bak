angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('world', {
      url: '/build/world/:slug',
      templateUrl: 'world/index.html',
      controller: 'World'
    });
});
