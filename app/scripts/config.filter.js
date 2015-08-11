angular.module('showcaseApp')
  .filter('queryByCategories', function () {
    return function (projects, categories) {
      var filteredProjects = [];

      if (categories.length > 0) {
        projects.forEach(function (p) {
          p.get('categoriesToString').some(function (c) {
            if (categories.indexOf(c) > -1) {
              filteredProjects.push(p);
              return true;
            }

            return false;
          });
        });

        return filteredProjects;
      } else {
        return projects;
      }
    }
  })
