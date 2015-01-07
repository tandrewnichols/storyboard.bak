angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  //$urlRouterProvider.otherwise(function($injector, $location) {
    //if (_(['/logout']).contains($location.path())) {
      //window.location.replace($location.absUrl());
    //} else {
      //return '/';
    //}
  //});
  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'index.html',
      controller: 'Header',
      abstract: true,
      resolve: {
        author: function(Api) { return Api.Member.get({}).$promise; },
        worlds: function(Api) { return Api.World.query().$promise; },
        stories: function(Api) { return Api.Story.query().$promise; }
      }
    })
    .state('main.home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'Home'
    });
});
