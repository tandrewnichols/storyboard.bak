angular.module('app').factory('Api', function($resource) {
  var Member = $resource('/member/:id', { id: '@uid' }, { update: { method: 'PUT' } });
  return {
    Member: Member
  };
});
