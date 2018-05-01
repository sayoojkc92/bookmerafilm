'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booking', {
        template: '<booking></booking>'
      });
  });
