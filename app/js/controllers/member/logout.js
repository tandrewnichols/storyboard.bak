angular.module('app').controller('Logout', function($scope, $rootScope, $state) {
  $scope.logout = function() {
    $.removeCookie('member', { path: '/' });
    delete $rootScope.member;
    $state.go('home');
  };
});
