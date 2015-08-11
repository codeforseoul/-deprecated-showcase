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
    $scope.cats = [];
    $scope.projects = [];
    $scope.catsForFilter = [];

    parseSDK.getRows('SubCategory')
      .then(function (cats) {
        $scope.cats = cats;
      })

    parseSDK.getRows('Project')
      .then(function (projects) {
        // remove loader
        removeLoader();

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
            }
          });
        });
      });

    $scope.filterByCat = function (event, a) {
      if ($(event.target).hasClass('blue')) {
        $(event.target).removeClass('blue');
        removeItem($scope.catsForFilter, a);
      } else {
        $(event.target).addClass('blue');
        $scope.catsForFilter.push(a);
      }

      console.log($scope.catsForFilter);
    };

    function removeItem (arr, item) {
      var index = arr.indexOf(item);

      if (index > -1) {
        arr.splice(index, 1);
        return arr;
      } else {
        return arr;
      }
    };

    function removeLoader () {
      $("#projects  .dimmer").removeClass('active');
    };
  });
