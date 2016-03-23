'use strict';

/* App Module */
angular.module('bmcApp', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'md5',
  'ui-gravatar',
  'ngTagsInput'
]).config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/list.html',
      controller: 'ListCtrl'
    })
    .when('/auth', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/tags_cloud', {
      templateUrl: 'views/tags-cloud.html',
      controller: 'TagsCloudCtrl'
    })
    .when('/random', {
      templateUrl: 'views/list.html',
      controller: 'RandomCtrl'
    })
    .when('/search', {
      templateUrl: 'views/list.html',
      controller: 'SearchCtrl'
    })
    .when('/tags/:tag', {
      templateUrl: 'views/list.html',
      controller: 'TagCtrl'
    })
    .when('/detail/new', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })
    .when('/detail/:oid', {
      templateUrl: 'views/detail.html',
      controller: 'DetailCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}).config(function(tagsInputConfigProvider) {
  tagsInputConfigProvider.setDefaults('tagsInput', {
    customClass: 'bootstrap',
    placeholder: '添加标签',
    minLength: 2,
    allowedTagsPattern: /(^[\u4E00-\u9FA5\uF900-\uFA2D\w\s]+$)/
  }).setDefaults('autoComplete', {
    maxResultsToShow: 10,
    debounceDelay: 1000
  });
});
var transFn = function(data) {
  return $.param(data);
},
  postCfg = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: transFn
  };
