angular.module('app').controller('Header', function($scope, $rootScope, Member) {
  Member.get({}, function(member) {
    if (member.id) {
      $rootScope.member = member;
    }
  });
});
