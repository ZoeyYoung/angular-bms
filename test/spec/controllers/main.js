'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bmcApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('mouseoverIndex to be -1', function () {
    expect(scope.bmsList.mouseoverIndex).toBe(-1);
  });
});
