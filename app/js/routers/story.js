angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('story', {
      url: '/story/:slug',
      templateUrl: 'story/index.html',
      controller: 'Story'
    });
});
