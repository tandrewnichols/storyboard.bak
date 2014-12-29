angular.module('app').directive('blurTrack', function() {
  return {
    link: function($scope, $element, $attributes, ngModel) {
      $scope.blurred = $scope.blurred || {};
      $element.find('[ng-model]').each(function(index, input) {
        $input = angular.element(input);
        var ngmodel = $input.attr('ng-model');
        $input.on('focus', function(event) {
          $scope.blurred[ngmodel] = false;
          $scope.$apply();
        });
        $input.on('blur', function(event) {
          $scope.blurred[ngmodel] = true;
          $scope.$apply();
        });
      });
    }
  };
});
