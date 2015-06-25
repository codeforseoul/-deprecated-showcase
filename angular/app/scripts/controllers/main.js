'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('MainCtrl', function ($scope, $q, parseSDK) {
    $scope.projects = [];

    parseSDK.getAll('Project', 0)
      .then(function (projects) {
        $scope.projects = projects;

        projects.forEach(function (project, index) {
          project.relation('contributors').query().find({
            success: function (users) {
              $scope.projects[index].contributors = users;
              $scope.$apply();
            }
          });
        });
      });
  });


angular.module('showcaseApp')
  .controller('NavCtrl', function ($scope, $modal, $log) {
    $scope.openSigninForm = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'views/components/signinForm.html',
        controller: 'SigninCtrl',
        size: size,
        resolve: {
          items: function () {
            return '1';
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
});

angular.module('showcaseApp')
  .controller('SigninCtrl', function ($scope, $modal, $modalInstance, $log) {
    $scope.user = {};

    $scope.signin = function (form) {
      if(form.$valid) {
        // Auth.login({
        //   email: $scope.user.email,
        //   password: $scope.user.password
        // })
        // .then( function() {
        //   // Logged in, redirect to home
        //   $location.path('/');
        // })
        // .catch( function(err) {
        //   $scope.errors.other = err.message;
        // });
      }
    };
});
