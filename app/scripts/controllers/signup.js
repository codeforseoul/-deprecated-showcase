'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('SignupCtrl', function ($scope, $rootScope, $http, $state, parseSDK) {
    var valid = false;
    $scope.newUser = {};

    $scope.validatePassword = function () {
      if (!$scope.newUser.password || $scope.newUser.password == $scope.newUser.rePassword) {
        $('#new-re-password').removeClass('error');
        valid = true;

      } else {
        $('#new-re-password').addClass('error');
        valid = false;
      }
    };

    $scope.signUp = function () {
      if (!valid) {
        // error handling
        console.log('error');
      }

      parseSDK.signUp($scope.newUser)
        .then(function(user) {
          $rootScope.currentUser = user;

          $state.go('main', {}, {
            reload: true
          });
        }, function (error) {
          $('#signup-form .ui.error.message').show();
        });
    };
  });
