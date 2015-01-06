angular.module('app').factory('Slug', function() {
  return {
    slugify: function(text) {
      return text.toLowerCase().replace(/\b(the|a|an|and|or)\b/g, '').trim().replace(/[^0-9A-Za-z ]/g, '').replace(/\s+/g, '-');
    }
  };
});
