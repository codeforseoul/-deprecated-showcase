'use strict';

angular
  .module('showcaseApp')
    .factory('parseSDK', ['$q', '$rootScope', function ($q, $rootScope) {
      // Parse App Key: showcase
      Parse.initialize("Z0hMb4HRaZMuDtEPRwKKI6qq0hr06bpH6PGFaxQL", "pfWLen1gM2ySvmHkVaNpdRzKjUGskPGtr85AuI5Q");

      var Project = Parse.Object.extend('Project');

      return {
        signIn: function (user) {
          var deferred = $q.defer();

          Parse.User.logIn(user.username, user.password, {
            success: function(user) {
              deferred.resolve(user);
            },
            error: function(user, error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        },

        signUp: function (user) {
          var deferred = $q.defer();
          var newUser = new Parse.User();

          Object.keys(user).forEach(function (el) {
            if (el != 'rePassword') {
              newUser.set(el, user[el]);
            }
          });

          // newUser.set('emailVerified', false);

          newUser.signUp(null, {
            success: function(user) {
              deferred.resolve(user);
            },
            error: function(user, error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        },

        isLoggedIn: function () {
          return Parse.User.current();
        },

        logOut: function () {
          Parse.User.logOut();
          $rootScope.currentUser = null;
        },

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

        createNewProject: function (project) {
          var self = this;
          var deferred = $q.defer();
          var newProject = new Project();
          var newProjectCats = newProject.relation('categories');

          if (!self.isLoggedIn()) return deferred.reject(new Error('need to signin'));

          Object.keys(project).forEach(function (param) {
            newProject.set(param, project[param]);
          });


          project.cats.forEach(function (cat) {
            newProjectCats.add(cat);
          });

          newProject.relation('administrators').add(Parse.User.current());
          newProject.relation('contributors').add(Parse.User.current());

          newProject.save().then(function(savedProject) {
            deferred.resolve(savedProject);
          }, function (error) {
            deferred.reject(error);
          })

          return deferred.promise;
        },

        addMemberToProject: function (userId, projectId) {
          var self = this;
          var deferred = $q.defer();
          var userQ = new Parse.Query(Parse.User);

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
