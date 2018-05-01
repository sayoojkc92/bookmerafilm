'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/findMovie', {
        template: '<find-movie></find-movie>'
      });
  });
