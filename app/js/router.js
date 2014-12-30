angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  //$urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'Home'
    })
    .state('join', {
      url: '/join',
      templateUrl: 'member/join.html',
      controller: 'Join'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'member/login.html',
      controller: 'Login'
    });
});
