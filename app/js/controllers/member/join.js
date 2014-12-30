angular.module('app').controller('Join', function($scope, $state, Member) {
  $scope.submit = function() {
    Member.save($scope.member, function(member) {
      if (member.id) {
        $state.go('home');
      }
    }); 
  };

  $scope.checkEmail = function() {
    if ($scope.member && $scope.member.email) {
      Member.get({ email: $scope.member.email }, function(results) {
        $scope.registerForm.email.$error.taken = !results.available;
      });
    }
  };

  $scope.checkPassword = function() {
    $scope.registerForm.password.$error.length = false;
    $scope.registerForm.password.$error.pattern = false;
    if ($scope.member && $scope.member.password) {
      if ($scope.member.password.length < 5) {
        $scope.registerForm.password.$error.length = true;
        $scope.registerForm.password.$invalid = true;
        $scope.registerForm.$invalid = true;
      } else {
        var count = 0;
        count += (/[a-z]/.test($scope.member.password) ? 1 : 0);
        count += (/[A-Z]/.test($scope.member.password) ? 1 : 0);
        count += (/[0-9]/.test($scope.member.password) ? 1 : 0);
        count += (/[^A-Za-z0-9]/.test($scope.member.password) ? 1 : 0);
        if (count < 2) {
          $scope.registerForm.password.$error.pattern = true;
          $scope.registerForm.password.$invalid = true;
          $scope.registerForm.$invalid = true;
        }
      }
    }
  };
});
