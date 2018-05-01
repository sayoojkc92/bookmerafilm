'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mapping', {
        template: '<mapping></mapping>'
      });
  });
