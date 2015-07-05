'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectCtrl
 * @description
 * # ProjectCTRL
 * Controller of the Project Page
 */
angular.module('showcaseApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, parseSDK, githubSDK) {
    $scope.project = {};
    $scope.project = {
      contributors: [],
      cats: [],
      readme: ''
    };

    parseSDK.getById('Project', $stateParams.id)
      .then(function (project) {
        $scope.project = project;

        // get a list of project's contributors
        project.relation('contributors').query().find().then(function (users) {
          $scope.project.contributors = users;
          $scope.$apply();
        });

        // get a list of project's categories
        project.relation('categories').query().find().then(function (cats) {
          $scope.project.cats = cats;
          $scope.$apply();
        });

        if (project.get('github')) {
          githubSDK.getEvents(project.get('github').owner, project.get('github').repo)
            .then(function (events) {
              $scope.project.events = events;
            });

          // // get readme.md instead of description
          // githubSDK.getReadme(project.get('github').owner, project.get('github').repo)
          //   .then(function (readme) {
          //     $scope.project.readme = readme;
          //   });
        }
      })

  });
