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
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'Home'
    });
});
