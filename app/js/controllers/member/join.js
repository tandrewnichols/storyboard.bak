angular.module('app').controller('Join', function($scope, Member) {
  $scope.submit = function() {
    Member.save($scope.member); 
  };
});
