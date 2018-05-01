'use strict';

angular.module('yeomanappprojectApp', ['yeomanappprojectApp.auth', 'yeomanappprojectApp.admin',
    'yeomanappprojectApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
