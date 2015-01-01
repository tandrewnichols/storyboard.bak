angular.module('app').controller('Appearance', function($scope, Api) {
  $scope.submit = function(update) {
    $scope.$root.member.theme = update.theme;
    $scope.$root.member.inverse = update.inverse;
    $scope.$root.member.$save();
  };
});
