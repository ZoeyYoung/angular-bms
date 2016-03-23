'use strict';

angular.module('bmcApp')
  .controller('MainCtrl', function($scope) {
    $scope.host = 'http://localhost:8888';
    $scope.user = {
      'email': 'ydingmiao@gmail.com',
      'name': 'Zoey'
    };
    $scope.bmsList = {
      'bookmarks': [],
      'mouseoverIndex': -1,
      'currentTag': undefined,
      'keywords': undefined,
      'pager': {
        'cur': 1,
        'start_page': 1,
        'end_page': 1,
        'has_next': false,
        'has_prev': false,
        'last_page': 1
      }
    };
    $scope.bmDetail = {
      'highlights': [],
      'url': '',
      'bookmark': undefined,
      'webpage': undefined
    };
    $scope.showState = {
      'pane': '1',
      'pager': true,
      'urlForm': false,
      'lastLocation': undefined,
      'lastActivePage': undefined
    };
    $scope.reset = function() {
      $scope.bmsList.mouseoverIndex = -1;
      $scope.bmsList.keywords = undefined;
      $scope.bmsList.currentTag = undefined;
      $scope.bmsList.pager = {};
      $scope.bmsList.pager.cur = 1;
      $scope.showState.pager = true;
      $scope.showState.readView = false;
      $scope.showState.editForm = true;
      $scope.showState.urlForm = false;
    };
  });
