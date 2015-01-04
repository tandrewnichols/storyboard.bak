angular.module('app').controller('Login', function($scope, Api) {
  $scope.submit = function() {
    $scope.error = null;
    $scope.dismissed = false;
    if (_.safe($scope, 'member.email') && _.safe($scope, 'member.password')) {
      Api.Member.get($scope.member, function(member) {
        if (member.uid) {
          $scope.$root.member = member;
          $scope.state.go('home');
        }
      }, function(response) {
        $scope.error = response.data.error;
      });
    }
  };
});
