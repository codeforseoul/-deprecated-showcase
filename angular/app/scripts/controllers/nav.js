'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('NavCtrl', function ($scope, $rootScope, $state, parseSDK) {
    $scope.logOut = function () {
      parseSDK.logOut();

      $state.go('main', {}, {
        reload: true
      })
    }
    // $rootScope.currentUser = Parse.User.current() ? Parse.User.current() : null;
  });
