'use strict';

angular.module('bmcApp')
  .controller('BookmarkCtrl', function($scope, $http, $routeParams, $location) {
    $scope.detail = function(index) {
      var bookmark = this.bookmark;
      $scope.bmDetail.bookmark = bookmark;
      $scope.bmsList.bookmarks.splice(index, 1);
      $scope.showState.lastLocation = $location.url();
      $scope.showState.lastActivePage = angular.copy($scope.bmsList.pager);
      $location.url('/detail/' + bookmark._id.$oid);
    };
    $scope.star = function() {
      var bookmark = this.bookmark;
      $http.put($scope.host + '/api/v1/u-b/' + $scope.user.name + '/' + bookmark['_id']["$oid"], {
        method: 'set-star'
      }, postCfg).success(function(response) {
        if (response.success === 'true') {
          bookmark.is_star = response.bookmark.is_star;
        } else {
          alert('数据库返回错误');
        }
      });
    };
    $scope.refresh = function(index) {
      $scope.refresh_index = index;
      var bookmark = this.bookmark;
      $http.post($scope.host + '/api/v1/w-w', {
        url: bookmark.url,
        method: 'force'
      }, postCfg).success(function(response) {
        if (response.success === 'true') {
          bookmark.title = response.webpage.title;
          bookmark.excerpt = response.webpage.excerpt;
        } else {
          alert('数据库返回错误');
        }
        $scope.refresh_index = -1;
      });
    };
    $scope.delete = function(index) {
      var bookmark = this.bookmark;
      $http.delete($scope.host + '/api/v1/u-b/' + $scope.user.name + '/' + bookmark['_id']["$oid"]).success(function(response) {
        if (response.success === 'true') {
          $scope.bmsList.bookmarks.splice(index, 1);
        } else {
          alert('数据库返回错误');
        }
      });
    };
  });
