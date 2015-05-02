'use strict';

/**
 * @ngdoc function
 * @name showcaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the showcaseApp
 */
angular.module('showcaseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.projects = [{
      'id': 1,
      'title': 'Showcase',
      'description': 'Showcase is the project management service for open communities or organisations.',
      'contributors': [{
          'id': 1,
          'name': 'Damien',
          'position': 'creator',
          'role': 'front-end developer',
          'image': 'https://secure.gravatar.com/avatar/d43096c89e3e122ccd7eb3fac4f6a025.jpg'
        },{
          'id': 2,
          'name': 'Hong',
          'position': 'creator',
          'role': 'back-end developer',
          'image': 'https://secure.gravatar.com/avatar/4fad4b97afdaa61809511c1460ccbc65.jpg'
        },{
          'id': 3,
          'name': 'Hoony',
          'position': 'creator',
          'role': 'front-end developer',
          'image': 'https://secure.gravatar.com/avatar/8b7fafcd76aff384df3f0c97c5c2218b.jpg'
        }],
      'categories': ['javascript', 'angular', 'ruby on rails']
    },{
      'id': 2,
      'title': 'Country Worry 21',
      'description': 'Countr Worry 21 is ...',
      'contributors': [{
          'id': 4,
          'name': 'David Hong',
          'position': 'creator',
          'role': 'developer',
          'image': 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-04-05/4327176285_139aa7c51f9f837c8a2d_192.jpg'
        }],
      'categories': ['d3', 'data']
    }];
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
