angular.module('app').controller('Profile', function($scope, author) {
  $scope.$root.author = author;
});
