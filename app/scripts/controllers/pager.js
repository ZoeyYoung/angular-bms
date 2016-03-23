'use strict';

angular.module('bmcApp')
  .controller('PagerCtrl', function($scope) {
    var setRange = function() {
      if ($scope.bmsList.pager.cur > 5) {
        $scope.bmsList.pager.start_page = $scope.bmsList.pager.cur - 4;
        $scope.bmsList.pager.end_page = $scope.bmsList.pager.cur + 5;
      } else {
        $scope.bmsList.pager.start_page = 1;
        $scope.bmsList.pager.end_page = 10;
      }
      if ($scope.bmsList.pager.last_page < 10 || $scope.bmsList.pager.end_page > $scope.bmsList.pager.last_page) {
        $scope.bmsList.pager.end_page = $scope.bmsList.pager.last_page + 1;
      }
    };
    var getRange = function(start, end) {
      var ret = [];
      if (!end) {
        end = start;
        start = 0;
      }
      for (var i = start; i < end; i++) {
        ret.push(i);
      }
      return ret;
    };
    $scope.firstPage = function() {
      $scope.bmsList.pager.cur = 1;
    };
    $scope.lastPage = function() {
      $scope.bmsList.pager.cur = $scope.bmsList.pager.last_page;
    };
    $scope.prevPage = function() {
      if ($scope.bmsList.pager.cur > 1) {
        $scope.bmsList.pager.cur--;
      }
    };
    $scope.nextPage = function() {
      if ($scope.bmsList.pager.cur < $scope.bmsList.pager.last_page) {
        $scope.bmsList.pager.cur++;
      }
    };
    $scope.setPage = function() {
      $scope.bmsList.pager.cur = this.n;
    };
    $scope.$watch('bmsList.pager', function(newValue, oldValue) {
      console.log('Pager $watch bmsList.pager', oldValue, '=>', newValue);
      setRange();
      $scope.range = getRange($scope.bmsList.pager.start_page, $scope.bmsList.pager.end_page);
    }, true);
  });
