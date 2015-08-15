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

        parseSDK.getRows('Update', [{
          query: 'include',
          value: 'user'
        },{
          query: 'equalTo',
          value: ['project', project]
        }]).then(function (updates) {
          $scope.updates = updates;
          $scope.updates.forEach(function (u) {
            u.convertedCreatedAt = convertDate(u.createdAt);
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
        // project.relation('categories').query().find().then(function (cats) {
        //   $scope.project.cats = cats;
        //   $scope.$apply();
        // });

        if (project.get('github')) {
          githubSDK.getEvents(project.get('github').owner, project.get('github').repo)
            .then(function (events) {
              $scope.project.events = events;
              console.log(events[0]);
            });

          // // get readme.md instead of description
          githubSDK.getReadme(project.get('github').owner, project.get('github').repo)
            .then(function (readme) {
              // $scope.project.readme = readme;
              $scope.project.readme = decodeURIComponent(escape(atob(readme.content)));
            });
        }
      });

    function convertDate(date) {

    };

    $scope.contribute = function () {
      if ($scope.currentUser) {
        parseSDK.putARow(currentProject, [{
          query: 'relation',
          value: ['contributors', $scope.currentUser]
        }]).then(function (newProject) {
          console.log(newProject);
          $state.reload();
        })
      } else {
        alert("로그인이 필요합니다.");
        $state.go('signin');
      }
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
