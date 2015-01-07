angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('main.story', {
      url: '/story/:slug',
      templateUrl: 'story/index.html',
      controller: 'Story'
    });
});
