angular.module('app').controller('Home', function($scope, author) {
  $scope.$root.author = author; 
});
