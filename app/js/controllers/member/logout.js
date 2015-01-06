angular.module('app').controller('Logout', function($scope, $rootScope, $state) {
  $scope.logout = function() {
    $.removeCookie('author', { path: '/' });
    delete $rootScope.author;
    $state.go('home');
  };
});
