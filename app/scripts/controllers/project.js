'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectCtrl
 * @description
 * # ProjectCTRL
 * Controller of the Project Page
 */
angular.module('showcaseApp')
  .controller('ProjectCtrl', function ($scope, $state, $stateParams, parseSDK, githubSDK) {
    var currentProject;
    $scope.isContributor = false;
    $scope.project = {};
    $scope.project = {
      contributors: [],
      cats: [],
      readme: ''
    };
    $scope.updates = [];
    $scope.newUpdate = {};

    parseSDK.getById('Project', $stateParams.id)
      .then(function (project) {
        currentProject = project;
        $scope.project = project;

        parseSDK.getRows('Update', {
          include: 'user',
          equalTo: ['project', project]
        }).then(function (updates) {
          $scope.updates = updates;
          $scope.updates.forEach(function (u) {
            u.createdAt = convertDate(u.createdAt);
          })
        });

        // get a list of project's contributors
        project.relation('contributors').query().find().then(function (users) {
          $scope.project.contributors = users;
          $scope.$apply();

          users.some(function (user) {
            if (user.id == Parse.User.current().id) {
              $scope.isContributor = true;
              $scope.$apply();
              return true;
            }

            return false;
          })
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
      });

    $scope.contribute = function () {
      $state.reload();
      // parseSDK.addMemberToProject(currentProject.id, Parse.User.current().id)
      //   .then(function (project) {
      //     $state.go()
      //   })
    }

    $scope.editProject = function () {
      $state.go('projectEdit', {id: $scope.project.id});
    };

    $scope.openUpdateForm = function () {
      $('#update-form').modal('show');
    };

    $scope.addUpdate = function () {
      parseSDK.postARow('Update', {
        user: Parse.User.current(),
        project: currentProject,
        title: $scope.newUpdate.title,
        content: $scope.newUpdate.content,
      }).then(function (update) {
        console.log(update);
      });
    };
  });
