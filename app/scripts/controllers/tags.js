'use strict';

angular.module('bmcApp')
  .controller('TagsCloudCtrl', function($scope, $http) {
    if ($scope.tagsCloud === undefined) {
      $http.get($scope.host + '/api/v1/u-tc/' + $scope.user.name).success(function(response) {
        $scope.tagsCloud = response;
      });
    }
  });
angular.module('bmcApp')
  .controller('TopTagsCtrl', function($scope, $http) {
    $http.get($scope.host + '/api/v1/u-tl/' + $scope.user.name + '/30').success(function(response) {
      $scope.topTags = response;
    });
  });
