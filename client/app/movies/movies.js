'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>'
      });
  });
