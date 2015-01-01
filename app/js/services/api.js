angular.module('app').factory('Api', function($resource) {
  var Member = $resource('/member/:id', { id: '@id' }, { update: { method: 'PUT' } });
  return {
    Member: Member
  };
});
