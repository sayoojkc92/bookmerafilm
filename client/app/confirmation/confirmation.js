'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/confirmation', {
        template: '<confirmation></confirmation>'
      });
  });
