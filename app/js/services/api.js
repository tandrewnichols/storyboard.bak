angular.module('app').factory('Api', function($resource, $rootScope) {
  return {
    World: $resource('/world/:id', { id: '@uid' }),
    Story: $resource('/story/:id', { id: '@uid' })
  };
});
