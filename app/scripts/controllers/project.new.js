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

    parseSDK.getRows('SubCategory')
      .then(function (categories) {
        $scope.allCats = categories;
      });

    $scope.createAProject = function () {
      $scope.newProject.cats = [];
      $scope.newProject.catsToString = [];

      // convert cats' id to objects
      $scope.selectedCats.forEach(function (selectedCat) {
        $scope.allCats.some(function (cat) {
          if (cat.id === selectedCat) {
            $scope.newProject.cats.push(cat);
            $scope.newProject.catsToString.push(cat.get('title'))
            return true;
          }
          return false;
        })
      });

      console.log($scope.newProject.catsToString);

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
        }, {
          column: 'creator',
          value: $scope.currentUser
        }, {
          column: 'categoriesToString',
          value: $scope.newProject.catsToString
        }],
        relation: [{
          column: 'categories',
          value: $scope.newProject.cats
        }, {
          column: 'contributors',
          value: [$scope.currentUser]
        }, {
          column: 'administrators',
          value: [$scope.currentUser]
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
