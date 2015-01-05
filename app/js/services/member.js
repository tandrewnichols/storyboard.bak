angular.module('app').factory('Member', function($resource, $rootScope) {
  var Member = $resource('/member/:id', { id: '@uid' }, { update: { method: 'PUT' } });

  $rootScope.loadingAuthor = true;
  Member.get({}, function(member) {
    if (member && member.uid) {
      $rootScope.author = member;
      $rootScope.loadingAuthor = false;
    }
  }, function(err) {
    console.log('got error:', err);
    $rootScope.loadingAuthor = false;
  });
  
  return Member;
});