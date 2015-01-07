angular.module('app').controller('Header', function($scope, author, worlds, stories) {
  author.worlds = worlds;
  author.stories = stories;
  $scope.author = author;
});
