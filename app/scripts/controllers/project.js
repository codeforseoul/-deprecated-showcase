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

    $scope.isAdmin = false;
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
      })
      .then(function () {
        parseSDK.getRows('Update', [{
          query: 'include',
          value: 'user'
        }, {
          query: 'equalTo',
          value: ['project', $scope.project]
        }, {
          query: 'descending',
          value: 'createdAt'
        }]).then(function (updates) {
          $scope.updates = updates;
          $scope.updates.forEach(function (u) {
            u.convertedCreatedAt = convertDate(u.createdAt);
          })
        });

        // get a list of project's administrators
        $scope.project.relation('administrators').query().find().then(function (users) {
          $scope.project.administrators = users;
          $scope.$apply();

          users.some(function (user) {
            if (user.id == Parse.User.current().id) {
              $scope.isAdmin = true;
              return true;
            }

            return false;
          });
        });

        // get a list of project's contributors
        $scope.project.relation('contributors').query().find().then(function (users) {
          $scope.project.contributors = users;
          $scope.$apply();

          users.some(function (user) {
            if (user.id == Parse.User.current().id) {
              $scope.isContributor = true;
              return true;
            }

            return false;
          });
        });

        // get a list of project's categories
        // project.relation('categories').query().find().then(function (cats) {
        //   $scope.project.cats = cats;
        //   $scope.$apply();
        // });

        if ($scope.project.get('github')) {
          githubSDK.getEvents($scope.project.get('github').owner, $scope.project.get('github').repo)
            .then(function (events) {
              $scope.project.events = events;
            });

          // // get readme.md instead of description
          githubSDK.getReadme($scope.project.get('github').owner, $scope.project.get('github').repo)
            .then(function (readme) {
              $scope.project.readme = decodeURIComponent(escape(atob(readme.content)));
            });
        }
      });

    function convertDate(date) {
      var convertedDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
      return convertedDate.getUTCMonth() + 1 + '월 ' + convertedDate.getUTCDate() + '일 ' + convertedDate.getUTCHours() + '시 ' + convertedDate.getUTCMinutes() + '분';
    };

    $scope.contribute = function () {
      if ($scope.currentUser) {
        parseSDK.putARow(currentProject, [{
          query: 'relation',
          value: ['contributors', $scope.currentUser]
        }]).then(function (newProject) {
          var Project = Parse.Object.extend('Project');
          var project = new Project();
          project.id = newProject.id;

          var porjectsContributing = $scope.currentUser.relation('projectsContributing');
          porjectsContributing.add(project);

          $scope.currentUser.save();
          $state.reload();
        });
      } else {
        alert("로그인이 필요합니다.");
        $state.go('signin');
      }
    }

    $scope.editProject = function () {
      $state.go('projectEdit', {id: $scope.project.id});
    };

    $scope.openModal = function (target) {
      $('.ui.modal.' + target).modal('show');
    };

    $scope.hideModal = function (target) {
      $('.ui.modal.' + target).modal('hide');
    };

    $scope.addUpdate = function () {
      parseSDK.postARow('Update', {
        set: [{
          column: 'user',
          value: Parse.User.current()
        }, {
          column: 'project',
          value: currentProject
        }, {
          column: 'title',
          value: $scope.newUpdate.title
        }, {
          column: 'content',
          value: $scope.newUpdate.content
        }]
      }).then(function (update) {
        $scope.updates.push(update);
        $scope.hideModal('update');
      });
    };

    $scope.addContributor = function (projectId) {
      parseSDK.putARow('Project', projectId, {
        relation: [{
          column: 'contributors',
          value: Parse.User.current()
        }]
      }).then(function (newProject) {
          alert('성공!');
          $state.reload();
        }, function (error) {
          alert(error.message);
        });
    };
  });
