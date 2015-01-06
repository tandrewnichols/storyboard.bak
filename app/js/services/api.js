angular.module('app').factory('Api', function($resource, $rootScope) {
  return {
    World: $resource('/api/world/:id', { id: '@uid' }),
    Story: $resource('/api/story/:id', { id: '@uid' })
  };
});
