'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:NewprojectCtrl
 * @description
 * # NewprojectCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('NewprojectCtrl', function ($scope, $state, parseSDK) {
    $scope.newProject = {};

    $scope.createAProject = function () {
      parseSDK.createNewProject($scope.newProject)
        .then(function (newProject) {
          alert('success!');

          $state.go('project', {id: newProject.id}, {
            reload: true
          });
        }, function (error) {
          alert(error.message);
        })
    }
  });
