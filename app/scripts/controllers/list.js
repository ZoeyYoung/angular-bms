'use strict';

angular.module('bmcApp')
  .controller('ListCtrl', function($scope, $http, $routeParams) {
    $scope.reset();
    $scope.bmsList.pager.cur = $routeParams.page ? $routeParams.page : 1;
    $scope.getPage = function(page) {
      $http.get($scope.host + '/api/v1/u-bl/' + $scope.user.name + '/' + page).success(function(response) {
        $scope.bmsList.bookmarks = response.bookmarks;
        $scope.bmsList.pager = response.page;
        // $scope.setRange();
      });
    };
    $scope.$watch('bmsList.pager.cur', function(newValue, oldValue) {
      console.log('ListPage $watch bmsList.pager.cur', oldValue, '=>', newValue);
      $scope.getPage(newValue);
      $('body').animate({
        scrollTop: 0
      });
    }, true);
  });
angular.module('bmcApp')
  .controller('TagCtrl', function($scope, $http, $routeParams) {
    $scope.reset();
    $scope.bmsList.currentTag = $routeParams.tag;
    $scope.bmsList.pager.cur = $routeParams.page ? $routeParams.page : 1;
    $scope.getPage = function(page) {
      $http.get($scope.host + '/api/v1/ut-bl/' + $scope.user.name + '/' + $routeParams.tag + '/' + page).success(function(response) {
        $scope.bmsList.bookmarks = response.bookmarks;
        $scope.bmsList.pager = response.page;
        // $scope.setRange();
        $scope.bmsList.tagcount = response.tagcount;
      });
    };
    $scope.$watch('bmsList.pager.cur', function(newValue, oldValue) {
      console.log('TagPage $watch bmsList.pager.cur', oldValue, '=>', newValue);
      $scope.getPage(newValue);
      $('body').animate({
        scrollTop: 0
      });
    }, true);
  });
angular.module('bmcApp')
  .controller('SearchCtrl', function($scope, $http, $routeParams) {
    $scope.reset();
    $scope.bmsList.keywords = $routeParams.keywords;
    $scope.bmsList.pager.cur = $routeParams.page ? $routeParams.page : 1;
    $scope.getPage = function(page) {
      $http.get($scope.host + '/api/v1/search-bl/' + $scope.user.name + '/' + page + '?keywords=' + $routeParams.keywords).success(function(response) {
        $scope.bmsList.bookmarks = response.bookmarks;
        $scope.bmsList.pager = response.page;
        // $scope.setRange();
        $scope.bmsList.ftxcount = response.ftxcount;
      });
    };
    $scope.$watch('bmsList.pager.cur', function(newValue, oldValue) {
      console.log('SearchPage $watch bmsList.pager.cur', oldValue, '=>', newValue);
      $scope.getPage(newValue);
      $('body').animate({
        scrollTop: 0
      });
    }, true);
  });
angular.module('bmcApp')
  .controller('RandomCtrl', function($scope) {
    $scope.reset();
    $scope.showState.pager = false;
  });
