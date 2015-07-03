'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('ProjectsCtrl', function ($scope, $rootScope, parseSDK) {
    $scope.projects = [];
    parseSDK.getRows('Project')
      .then(function (projects) {
        $scope.projects = projects;

        projects.forEach(function (project, index) {
          project.relation('contributors').query().find({
            success: function (users) {
              $scope.projects[index].contributors = users;
              $scope.$apply();

              // remove '참여하기' button
              users.some(function (user) {
                if (!$rootScope.currentUser) return true;
                else if (user.id == $rootScope.currentUser.id) {
                  $('#' + project.id + ' .ui.primary.button').hide();
                  return true;
                }

                return false;
              });

              // remove loader
              $("#projects  .dimmer").removeClass('active');
            }
          });
        });
      })
  });
