'use strict';

angular.module('bmcApp')
  .controller('DetailCtrl', function($scope, $http, $routeParams, $location) {
    var showArticle = function() {
      var minHeight = $('.bmc-form').height();
      var maxHeight = $(window).height() > minHeight ? $(window).height() : minHeight;
      $('.bmc-article').css('max-height', maxHeight);
      $('.bmc-content').css('min-height', minHeight);
    }, funGetSelectTxt = function() {
        var txt = '';
        if (document.selection) {
          txt = document.selection.createRange().text; // IE
        } else {
          txt = document.getSelection();
        }
        return txt.toString();
      };
    $scope.showState.readView = true;
    $scope.showState.editForm = true;
    $scope.showState.urlForm = false;
    $scope.oid = $routeParams.oid;
    $scope.highlight = false;
    $scope.highlightArticle = function() {
      if ($scope.highlight === false) {
        // console.log($scope.bmDetail.highlights);
        $('.bmc-article').highlight($scope.bmDetail.highlights, { element: 'mark', className: '' });
        $scope.highlight = true;
      }
    };
    $scope.initBookmarkForm = function(bookmark, webpage) {
      // 初始化添加书签表单
      if (bookmark._id) {
        $scope.bmDetail.oid = $routeParams.oid;
      }
      $scope.bmDetail.url = webpage.url;
      $scope.bmDetail.title = webpage.title;
      $scope.bmDetail.description = webpage.excerpt;
      // 防止用户已输入标签被清除
      $scope.bmDetail.tags = bookmark.tags;
      $scope.bmDetail.highlights = bookmark.highlights;
      // 推荐标签
      $scope.bmDetail.stags = webpage.tags.split(',');
      // 防止用户已输入笔记被清除
      var noteTemp = $scope.bmDetail.note;
      var note = (noteTemp === undefined) ? bookmark.note : bookmark.note + '\n' + noteTemp;
      $scope.bmDetail.note = note;
      $scope.bmDetail.content = webpage.content;
      showArticle();
    };
    if ($scope.bmDetail.bookmark === undefined) {
      $http.get($scope.host + '/api/v1/b/' + $routeParams.oid).success(function(bookmark) {
        $scope.bmDetail.bookmark = bookmark;
        $http.get('/api/v1/w-w/' + bookmark.webpage.$oid).success(function(webpage) {
          $scope.initBookmarkForm(bookmark, webpage);
        });
      });
    } else if ($scope.bmDetail.webpage === undefined) {
      $http.get($scope.host + '/api/v1/w-w/' + $scope.bmDetail.bookmark.webpage.$oid).success(function(webpage) {
        $scope.bmDetail.webpage = webpage;
        $scope.initBookmarkForm($scope.bmDetail.bookmark, webpage);
      });
    } else {
      $scope.initBookmarkForm($scope.bmDetail.bookmark, $scope.bmDetail.webpage);
      $scope.showState.editForm = false;
    }
    $scope.addTag = function(stag) {
      $scope.bmDetail.tags.push(stag);
    };

    $scope.resetBookmarkForm = function() {
      $scope.bmDetail.url = '';
      $scope.bmDetail.title = '';
      $scope.bmDetail.description = '';
      $scope.bmDetail.tags = [];
      $scope.bmDetail.highlights = [];
      $scope.bmDetail.stags = [];
      $scope.bmDetail.note = '';
      $scope.bmDetail.content = '';
      $scope.highlight = false;
      // console.log($scope.showState.lastLocation);
      $location.url($scope.showState.lastLocation);
      $scope.bmsList.page = $scope.showState.lastActivePage;
      $scope.bmDetail.bookmark = undefined;
      $scope.bmDetail.webpage = undefined;
    };
    $scope.submit = function() {
      $http.post($scope.host + '/api/v1/u-b/' + $scope.user.name, {
        url: $scope.bmDetail.url,
        favicon: '',
        tags: $scope.bmDetail.tags.join(','),
        note: $scope.bmDetail.note,
        highlights: $scope.bmDetail.highlights.join('|||'),
        method: 'update'
      }, postCfg).success(function(response) {
        if (response.success === 'true') {
          $scope.resetBookmarkForm();
          $scope.bmsList.bookmarks.splice(0, 0, response.bookmark);
        } else {
          console.log('数据库返回错误');
        }
      });
    };
    $scope.cancel = function() {
      $scope.bmsList.bookmarks.splice(0, 0, $scope.bmDetail.bookmark);
      $scope.resetBookmarkForm();
    };
    $scope.showEditorTools = function(e) {
      e = e || window.event;
      var txt = funGetSelectTxt(),
        sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var left = (e.clientX - 40 < 0) ? e.clientX + 30 : e.clientX - 40,
        top = (e.clientY - 40 < 0) ? e.clientY + sh + 10 : e.clientY + sh - 40;
      if (txt) {
        $scope.editorTools = {
          'display': 'inline',
          'left': left + 'px',
          'top': top + 'px'
        };
      } else {
        $scope.editorTools = {
          'display': 'none'
        };
      }
    };
    $scope.addTagBySel = function() {
      $scope.bmDetail.tags.push(funGetSelectTxt());
    };
    $scope.addNoteBySel = function() {
      var note = funGetSelectTxt();
      var noteTemp = $scope.bmDetail.note;
      note = (noteTemp === undefined || noteTemp === '') ? note : noteTemp + '\n\n' + note;
      $scope.bmDetail.note = note;
    };
    $scope.addHighlightBySel = function() {
      var word = funGetSelectTxt();
      var index = $scope.bmDetail.highlights.indexOf(word);
      if (index !== -1) {
        $scope.bmDetail.highlights.splice(index, 1);
      } else {
        $scope.bmDetail.highlights.push(word);
      }
      // console.log($scope.bmDetail.highlights);
    };
    $scope.$watch('bmDetail.highlights', function(newValue, oldValue) {
      console.log('$watch bmDetail.highlights', oldValue, '=>', newValue);
      if ($scope.highlight === true) {
        $('.bmc-article').unhighlight();
        $('.bmc-article').highlight(newValue, { element: 'mark', className: '' });
      }
    }, true);
    $scope.deleteByOidFn = function(oid) {
      $http.delete($scope.host + '/api/v1/u-b/' + $scope.user.name + '/' + oid).success(function(response) {
        if (response.success === 'true') {
          $scope.resetBookmarkForm();
        } else {
          console.log('数据库返回错误');
        }
      });
    };
    $scope.loadTags = function(query) {
      return ['aaaa', 'bbbb', 'cccx'];
    };
  });
