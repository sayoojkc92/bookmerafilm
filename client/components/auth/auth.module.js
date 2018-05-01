'use strict';

angular.module('yeomanappprojectApp.auth', ['yeomanappprojectApp.constants',
    'yeomanappprojectApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
