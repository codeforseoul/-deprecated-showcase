'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('ProjectsCtrl', ['$scope', '$rootScope', '$state', 'parseSDK', function ($scope, $rootScope, $state, parseSDK) {
    $scope.cats = [];
    $scope.projects = [];
    $scope.catsForFilter = [];

    parseSDK.getRows('SubCategory')
      .then(function (cats) {
        $scope.cats = cats;
      });

    parseSDK.getRows('Project')
      .then(function (projects) {
        // remove loader
        removeLoader();

        $scope.projects = projects;

        var promises = [];

        projects.forEach(function (project, index) {
          var promise = Parse.Promise.as();

          promise = promise.then(function () {
            return project.relation('contributors').query().find();
          }).then(function (contributors) {
            $scope.projects[index].contributors = contributors;
            $scope.projects[index].isContributor = false;
            $scope.$apply();

            if ($scope.currentUser) {
              contributors.some(function (contributor) {
                if (contributor.id === $scope.currentUser.id) {
                  $scope.projects[index].isContributor = true;
                  return true;
                }
                return false;
              });
            }
          });

          promises.push(promise);
        });

        return Parse.Promise.when(promises);
      }).then(function () {

      });

    $scope.filterByCat = function (event, a) {
      if ($(event.target).hasClass('blue')) {
        $(event.target).removeClass('blue');
        removeItem($scope.catsForFilter, a);
      } else {
        $(event.target).addClass('blue');
        $scope.catsForFilter.push(a);
      }
    };

    $scope.addContributor = function (projectId) {
      parseSDK.putARow('Project', projectId, {
        relation: [{
          column: 'contributors',
          value: Parse.User.current()
        }]
      }).then(function (newProject) {
          alert('성공!');
          $state.go('project', {id: projectId});
        }, function (error) {
          alert(error.message);
        });
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
      $("#projects-discover .dimmer").removeClass('active');
    };
  }]);
