angular.module('app').factory('Member', function($resource) {
  var Member = $resource('/member/:id', {id:'@id'});
  return Member;
});
