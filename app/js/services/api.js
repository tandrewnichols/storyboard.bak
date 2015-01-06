angular.module('app').factory('Api', function($resource, $rootScope) {
  return {
    World: $resource('/api/world/:id', { id: '@uid' }, { update: { method: 'PUT' } }),
    Story: $resource('/api/story/:id', { id: '@uid' }, { update: { method: 'PUT' } }),
    Member: $resource('/api/author', { id: '@uid' }, { update: { method: 'PUT' } })
  };
});
