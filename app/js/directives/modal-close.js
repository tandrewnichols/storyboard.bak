angular.module('app').directive('modalClose', function() {
  return {
    link: function($scope, $element, $attributes) {
      $scope.$watch($attributes.modalClose, function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          $element.closest('.modal').modal('hide');
        }
      });
    }
  };
});
