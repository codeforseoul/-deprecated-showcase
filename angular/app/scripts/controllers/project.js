'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectCtrl
 * @description
 * # ProjectCTRL
 * Controller of the Project Page
 */
angular.module('showcaseApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, parseSDK) {
    $scope.project = {};
    parseSDK.getById('Project', $stateParams.id)
      .then(function (project) {
        $scope.project = project;
        project.relation('contributors').query().find().then(function (users) {
          $scope.project.contributors = users;
          $scope.$apply();
        })
      })

  });
