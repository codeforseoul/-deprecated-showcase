'use strict';

describe('Controller: EditProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('showcaseApp'));

  var EditProjectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProjectCtrl = $controller('EditProjectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
