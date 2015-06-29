'use strict';

angular
  .module('showcaseApp')
    .factory('parseSDK', ['$q', function ($q) {
      var self = this;
      // Parse App Key: showcase
      Parse.initialize("Z0hMb4HRaZMuDtEPRwKKI6qq0hr06bpH6PGFaxQL", "pfWLen1gM2ySvmHkVaNpdRzKjUGskPGtr85AuI5Q");

      var Project = Parse.Object.extend('Project');

      return {
        getById: function (className, id, callback) {
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          var classObject = className == 'User' ? Parse.User : Parse.Object.extend(className);
          var query = new Parse.Query(classObject);

          query.get(id, {
            success: function (row) {
              deferred.resolve(row);
              return cb();
            },
            error: function (row,error) {
              deferred.reject(error);
              return cb();
            }
          });

          return deferred.promise;
        },

        getRows: function (className, count) {
          var queryCount = count ? count : 0;
          var deferred = $q.defer();

          var classObject = className == 'User' ? Parse.User : Parse.Object.extend(className);
          var query = new Parse.Query(classObject);

          // set limit number of rows to get if you want
          if (count > 0) query.limit(queryCount);

          query.find({
            success: function (rows) {
              deferred.resolve(rows);
            },
            error: function (rows, error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        },

        addMemberToProject: function (userId, projectId, callback) {
          var self = this;
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          var userQ = new Parse.Query(Parse.User);
          var projectQ = new Parse.Query(Project);
          self.getById('User', userId)
            .then(function (user) {
              self.getById('Project', projectId)
                .then(function (project) {
                  var contributors = project.relation('contributors');

                  contributors.add(user);
                  project.save();

                  deferred.resolve(project);
                }, function (project, error) {
                  deferred.reject(error);
                });
            }, function (user, error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }]);
