angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('world', {
      url: '/world/:slug',
      templateUrl: 'world/create.html',
      controller: 'World'
    });
});
