angular.module('app').controller('Login', function($scope, $rootScope, $state, Member) {
  $scope.submit = function() {
    $scope.error = null;
    $scope.dismissed = false;
    if (_.safe($scope, 'member.penname') && _.safe($scope, 'member.password')) {
      Member.get($scope.member, function(member) {
        if (member.id) {
          $rootScope.member = member;
          $state.go('home');
        }
      }, function(response) {
        $scope.error = response.data.error;
      });
    }
  };
});
