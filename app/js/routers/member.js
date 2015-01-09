angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('main.join', {
      url: '/join',
      templateUrl: 'member/join.html',
      controller: 'Join'
    })
    .state('main.login', {
      url: '/login',
      templateUrl: 'member/login.html',
      controller: 'Login'
    })
    .state('main.profile', {
      url: '/profile',
      abstract: true,
      templateUrl: 'member/profile/index.html',
      controller: 'Profile',
      access: 'member'
    })
    .state('main.profile.personal', {
      url: '/profile/personal',
      templateUrl: 'member/profile/personal.html',
      controller: 'Personal'
    })
    .state('main.profile.appearance', {
      url: '/profile/appearance',
      templateUrl: 'member/profile/appearance.html',
      controller: 'Appearance'
    })
    .state('main.dashboard', {
      url: '/dashboard',
      templateUrl: 'member/dashboard.html',
      controller: 'Dashboard',
      access: 'member'
    });
});
