angular.module('app').controller('Login', function($scope, Member) {
  $scope.submit = function() {
    $scope.error = null;
    $scope.dismissed = false;
    if (_.safe($scope, 'member.email') && _.safe($scope, 'member.password')) {
      Member.get($scope.member, function(member) {
        if (member.uid) {
          $scope.author = member;
          $scope.state.go('dashboard');
        }
      }, function(response) {
        $scope.error = response.data.error;
      });
    }
  };
});
