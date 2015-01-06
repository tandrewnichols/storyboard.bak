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
      templateUrl: 'member/profile/index.html'
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
      url: '/dashboard?foo',
      templateUrl: 'member/dashboard.html',
      controller: 'Dashboard',
      resolve: {
        author: function(Api) { return Api.Member.get({}).$promise; },
        worlds: function(Api) { return Api.World.query().$promise; },
        stories: function(Api) { return Api.Story.query().$promise; }
      }
    });
});
