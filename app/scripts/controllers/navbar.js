'use strict';

angular.module('bmcApp')
  .controller('NavbarCtrl', function($scope, $http, $location) {
    // 根据location自动更新导航active状态
    $scope.$watch(function() {
      // console.log('$watch $location.path()', $location.path());
      var path = $location.path();
      if (path === '/tags_cloud') {
        $scope.nav = 'tags-nav';
      } else if (path === '/random') {
        $scope.nav = 'random-nav';
      } else {
        $scope.nav = 'list-nav';
      }
    });
    $scope.error = {
      'has_error': false,
      'message': ''
    };
    $scope.$watch('bmDetail.url', function(newValue, oldValue) {
      console.log('$watch bmDetail.url', oldValue, '=>', newValue);
      $scope.error = {
        'has_error': false,
        'message': ''
      };
    }, true);
    $scope.listBookmarks = function() {
      $scope.bmsList.pager.cur = 1;
    };
    $scope.randomBookmarks = function() {
      $http.get($scope.host + '/api/v1/u-rbl/' + $scope.user.name).success(function(response) {
        $scope.bmsList.bookmarks = response;
      });
    };
    $scope.getBookmarkInfo = function() {
      console.log('wtf', this.urlForm.$valid);
      if (this.urlForm.$valid) {
        $http.post($scope.host + '/api/v1/w-w', {
          url: urlForm.url.value
        }, postCfg).success(function(response) {
          if (response.success === 'true') {
            var bookmark = response.bookmark;
            $scope.bookmarkForm.bookmark = bookmark;
            $scope.bookmarkForm.webpage = response.webpage;
            $scope.showState.lastLocation = $location.url();
            $scope.showState.lastActivePage = angular.copy($scope.bmsList.pager);
            $location.url('/detail/new');
          } else {
            console.log('数据库返回错误');
          }
        });
      } else {
        $scope.error.hasError = true;
        $scope.error.message = '';
        angular.forEach(this.urlForm.url.$error, function(value, key) {
          console.log(key, value);
          if (key === 'url' && value === true) {
            $scope.error.message += 'Not a valid URL';
          }
          if (key === 'required' && value === true) {
            $scope.error.message += 'Require';
          }
        });
      }
    };
    $scope.toggleUrlForm = function() {
      $scope.showState.urlForm = !$scope.showState.urlForm;
      if ($scope.showState.urlForm === false) {
        urlForm.url.value = '';
        $scope.error = {
          'has_error': false,
          'message': ''
        };
      }
    };
    $scope.submit = function(keywords) {
      $location.url('/search?keywords=' + keywords);
    };
  });
