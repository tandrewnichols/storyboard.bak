angular.module('app').controller('Graph', function($scope, $http) {
  $scope.labels = ['All'];
  $scope.getLabels = function() {
    $http.get('/db/query/labels').then(function(result) {
      $scope.labels = $scope.labels.concat(result.data);
    }, function() {
      // TODO: handle error
    });
  };

  $scope.dump = function() {
    $http.get('/db/dump' + (!$scope.selected || $scope.selected === 'All' ? '' : '/' + $scope.selected.toLowerCase())).then(function(result) {
      $scope.success = true;
    }, function(error) {
      $scope.error = error.data;
    });
  };
});
