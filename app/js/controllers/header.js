angular.module('app').controller('Header', function($scope, Api) {
  $scope.$root.loadingMember = true;
  Api.Member.get({}, function(member) {
    if (member.id) {
      $scope.$root.member = member;
      $scope.$root.loadingMember = false;
    }
  }, function(error) {
    $scope.$root.loadingMember = false;  
  });
});
