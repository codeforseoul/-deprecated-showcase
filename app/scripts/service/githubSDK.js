'use strict';

angular
  .module('showcaseApp')
    .factory('githubSDK', function ($http, $q, $rootScope) {
      var apiUrl = 'https://api.github.com/';
      return {
        getEvents: function (owner, repo, page) {
          var deferred = $q.defer();
          var page = page ? page : 1;

          $http.get(apiUrl + 'repos/' + owner + '/' + repo + '/events?page=' + page)
            .success(function (events) {
              deferred.resolve(events);
            })
            .error(function (events, status) {
              deferred.reject(status);
            });

          return deferred.promise;
        },

        getReadme: function (owner, repo) {
          var deferred = $q.defer();
          var page = page ? page : 1;

          $http.get(apiUrl + 'repos/' + owner + '/' + repo + '/readme')
            .success(function (readme) {
              deferred.resolve(readme);
            })
            .error(function (readme, status) {
              deferred.reject(status);
            });

          return deferred.promise;
        }
      };
    });
