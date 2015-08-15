'use strict';

/**
 * @ngdoc overview
 * @name showcaseApp
 * @description
 * # showcaseApp
 *
 * Main module of the application.
 */
angular
  .module('showcaseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'btford.markdown'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .state('newproject', {
        url: '/project/new',
        templateUrl: 'views/project.new.html',
        controller: 'NewprojectCtrl'
      })
      .state('project', {
        url: '/project/:id',
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl'
      })
      .state('projectEdit', {
        url: '/project/:id/edit',
        templateUrl: 'views/project.edit.html',
        controller: 'ProjectEditCtrl'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      });
  })
  .config(['$locationProvider', function ($locationProvider) {
    // $locationProvider.html5Mode(true);
  }]);
