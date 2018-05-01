'use strict';

describe('Component: FindMovieComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanappprojectApp'));

  var FindMovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    FindMovieComponent = $componentController('findMovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
