'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('MainCtrl', function ($scope, $q, parseSDK) {
    $scope.projects = [];

    parseSDK.getRows('Project')
      .then(function (projects) {
        $scope.projects = projects;

        projects.forEach(function (project, index) {
          project.relation('contributors').query().find({
            success: function (users) {
              $scope.projects[index].contributors = users;
              $scope.$apply();
            }
          });
        });
      });
  });
