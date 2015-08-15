'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('SigninCtrl', function ($scope, $rootScope, $state, parseSDK) {
    $scope.user = {};

    var previousPage = $state.params.fromState.name;
    previousPage = previousPage ? previousPage : 'main';

    $scope.signIn = function () {
      Parse.User.logIn($scope.user.username, $scope.user.password, {
        success: function(user) {
          $rootScope.currentUser = user;
          $state.go(previousPage, $state.params.fromParams, {
            reload: true
          });
        },
        error: function(user, error) {
          // TODO: error handling
          console.log(error);
        }
      });
    };
  });
