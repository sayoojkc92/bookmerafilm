'use strict';

angular.module('yeomanappprojectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/payment', {
        template: '<payment></payment>'
      });
  });
