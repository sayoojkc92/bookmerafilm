'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatre', {
        template: '<theatre></theatre>'
      });
  });
