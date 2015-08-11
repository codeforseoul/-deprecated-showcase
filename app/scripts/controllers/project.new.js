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
    $scope.allCats = [];
    $scope.selectedCats = [];
    $scope.newProject.cats = [];

    parseSDK.getRows('SubCategory')
      .then(function (categories) {
        $scope.allCats = categories;
      });

    $scope.createAProject = function () {
      // convert cats' id to objects
      $scope.selectedCats.forEach(function (selectedCat) {
        $scope.allCats.some(function (cat) {
          if (cat.id === selectedCat) {
            $scope.newProject.cats.push(cat);
            return true;
          }
          return false;
        })
      });

      parseSDK.postARow('Project', {
        set: [{
          column: 'title',
          value: $scope.newProject.title
        }, {
          column: 'desc',
          value: $scope.newProject.desc
        }, {
          column: 'url',
          value: $scope.newProject.url
        }],
        relation: [{
          column: 'categories',
          value: $scope.newProject.cats
        }]
      }).then(function (newProject) {
          alert('success!');

          $state.go('project', {id: newProject.id}, {
            reload: true
          });
        }, function (error) {
          alert(error.message);
        });
    }
  });
