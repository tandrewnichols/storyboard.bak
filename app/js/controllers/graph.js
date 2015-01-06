angular.module('app').controller('Graph', function($scope, $http) {
  $scope.labels = ['All'];
  $scope.getLabels = function() {
    $http.get('/api/db/query/labels').then(function(result) {
      $scope.labels = $scope.labels.concat(result.data);
    }, function() {
      // TODO: handle error
    });
  };

  $scope.dump = function() {
    $http.get('/api/db/dump' + (!$scope.selected || $scope.selected === 'All' ? '' : '/' + $scope.selected.toLowerCase())).then(function(result) {
      console.log(result);
      $scope.success = 'Successfully deleted all' + ($scope.selected === 'All' ? '' : ' ' + $scope.selected) + ' nodes.';
    }, function(error) {
      $scope.error = error.data;
    });
  };
});
