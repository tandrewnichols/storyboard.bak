angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('join', {
      url: '/join',
      templateUrl: 'member/join.html',
      controller: 'Join'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'member/login.html',
      controller: 'Login'
    })
    .state('profile', {
      url: '/profile',
      abstract: true,
      templateUrl: 'member/profile/index.html',
      controller: 'Profile',
      access: 'member'
    })
    .state('profile.personal', {
      url: '/profile/personal',
      templateUrl: 'member/profile/personal.html',
      controller: 'Personal'
    })
    .state('profile.appearance', {
      url: '/profile/appearance',
      templateUrl: 'member/profile/appearance.html',
      controller: 'Appearance'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'member/dashboard.html',
      controller: 'Dashboard',
      access: 'member'
    });
});
