'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('ProjectsCtrl', function ($scope, parseSDK) {
    $scope.projects = [];
    parseSDK.getRows('Project')
      .then(function (projects) {
        $scope.projects = projects;
      })
  });
