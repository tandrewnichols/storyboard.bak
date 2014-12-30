angular.module('app').controller('Login', function($scope, $window, Member) {
  $scope.submit = function() {
    $scope.error = null;
    $scope.dismissed = false;
    if (_.safe($scope, 'member.penname') && _.safe($scope, 'member.password')) {
      Member.get($scope.member, function(member) {
        if (member.id) {
          $window.location = '/';
        }
      }, function(response) {
        $scope.error = response.data.error;
      });
    }
  };
});
