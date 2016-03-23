'use strict';

angular.module('bmcApp')
  .controller('AuthCtrl', function($scope, $http, $location) {
    $scope.showState.readView = true;
    $scope.showState.showSignIn = true;
    $scope.signIn = function() {
      $http.post($scope.host + '/api/v1/auth/signin', {
        email: $scope.user.email,
        password: $scope.user.password
      }, postCfg).success(function(response) {
        console.log(response);
        if (response) {
          $location.url('/');
          console.log("登录成功");
        }
      });
      console.log($scope.user.name);
    };
    $scope.signUp = function() {
      $http.post($scope.host + '/api/v1/auth/signup', {
        email: $scope.user.email,
        username: $scope.user.name,
        password: $scope.user.password
      }, postCfg).success(function(response) {
        console.log(response);
        if (response) {
          $location.url('/');
          console.log("成功");
        }
      });
      console.log($scope.user.name);
    };
  });
