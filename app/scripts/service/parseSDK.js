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

        getById: function (className, id) {
          var deferred = $q.defer();

          var classObject = className == 'User' ? Parse.User : Parse.Object.extend(className);
          var query = new Parse.Query(classObject);

          query.get(id, {
            success: function (row) {
              deferred.resolve(row);
            },
            error: function (row,error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        },

        getRows: function (className, params) {
          var deferred = $q.defer();
          var classObject = className == 'User' ? Parse.User : Parse.Object.extend(className);
          var query = new Parse.Query(classObject);

          if (params) {
            params.forEach(function (param) {
              switch (param.query) {
                case 'equalTo':
                  query[param.query](param.value[0], param.value[1]);
                  break;
                default:
                  query[param.query](param.value);
                  break;
              }
            })
          }

          query.find().then(function(rows) {
            deferred.resolve(rows);
          }, function (error) {
            deferred.reject(error);
          });

          return deferred.promise;
        },

        postARow: function (className, params) {
          var deferred = $q.defer();
          var Obj = Parse.Object.extend(className);
          var obj = new Obj();

          Object.keys(params).forEach(function (param) {
            switch (param) {
              case 'set':
                params[param].forEach(function (el) {
                  obj.set(el.column, el.value);
                });
                break;
              case 'relation':
                params[param].forEach(function (els) {
                  var r = obj.relation(els.column);
                  if (typeof els.value == 'object') {
                    els.value.forEach(function (el) {
                      r.add(el);
                    });
                  }
                });
                break;
              default:
                break;
            }
          });

          obj.save().then(function (newObj) {
            deferred.resolve(newObj);
          }, function (error) {
            deferred.reject(error);
          });

          return deferred.promise;
        },

        createNewProject: function (project) {
          var self = this;
          var deferred = $q.defer();
          var newProject = new Project();

          project.cats.forEach(function (cat) {
            newProjectCats.add(cat);
          });

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
