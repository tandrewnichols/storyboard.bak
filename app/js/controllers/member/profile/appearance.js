angular.module('app').controller('Appearance', function($scope) {
  $scope.submit = function(update) {
    $scope.author.theme = update.theme;
    $scope.author.inverse = update.inverse;
    $scope.author.$save();
  };
});
