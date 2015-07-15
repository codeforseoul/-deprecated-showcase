'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:EditProjectCtrl
 * @description
 * # EditProjectCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('ProjectEditCtrl', function ($scope, $stateParams, parseSDK) {
    $scope.project = {};
    $scope.allCats = [];
    $scope.selectedCats = [];



    parseSDK.getById('Project', $stateParams.id)
      .then(function (project) {
        $scope.project.title = project.get('title');
        $scope.project.desc = project.get('desc');
        $scope.project.url = project.get('url');
        $scope.project.title = project.get('title');
      });

    $scope.editProject = function () {
      console.log($scope.selectedCats);
    };

  });
