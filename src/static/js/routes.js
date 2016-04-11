'use strict';
module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('Dashboard', {
          url: "/",
          templateUrl: "backend/dashboard.html"
      })
      .state('apps', {
          url: "/apps",
          templateUrl: "backend/apps.html"
      })
      .state('users', {
          url: "/users",
          templateUrl: "backend/users.html"
      })
      .state('models', {
          url: "/models",
          templateUrl: "backend/models.html"
      }).state('data', {
          url: "/data",
          templateUrl: "backend/data.html"
      }).state('endpoints', {
          url: "/endpoints",
          templateUrl: "backend/endpoints.html"
      });
});