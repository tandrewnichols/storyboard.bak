angular.module('app').controller('Dashboard', function($scope, Api, Slug) {
  $scope.saveWorld = function() {
    $scope.newWorldForm.error = '';
    $scope.newWorldForm.errorDismissed = false;
    $scope.world.slug = Slug.slugify($scope.world.name);
    Api.World.save($scope.world, function(world) {
      $scope.state.go('world', { slug: world.slug });
    }, function(response) {
      $scope.newWorldForm.error = _.safe(response, 'data.error', 'An error occurred while creating this world. Please try again later.');
    });
  };

  $scope.saveStory = function() {
    $scope.newStoryForm.error = '';
    $scope.newStoryForm.errorDismissed = false;
    $scope.story.slug = Slug.slugify($scope.story.title);
    Api.Story.save($scope.story, function(story) {
      $scope.state.go('story', { slug: story.slug });
    }, function(response) {
      $scope.newStoryForm.error = _.safe(response, 'data.error', 'An error occurred while creating this story. Please try again later.');
    });
  };
});
