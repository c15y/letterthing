'use strict';

// $viewPathProvider, to allow overriding system default views
angular.module('mean.system').provider('$viewPath', function() {
  function ViewPathProvider() {
    var overrides = {};

    this.path = function(path) {
      return function() {
        return overrides[path] || path;
      };
    };

    this.override = function(defaultPath, newPath) {
      if (overrides[defaultPath]) {
        throw new Error('View already has an override: ' + defaultPath);
      }
      overrides[defaultPath] = newPath;
      return this;
    };

    this.$get = function() {
      return this;
    };
  }

  return new ViewPathProvider();
});

// $meanStateProvider, provider to wire up $viewPathProvider to $stateProvider
angular.module('mean.system').provider('$meanState', ['$stateProvider', '$viewPathProvider', function($stateProvider, $viewPathProvider) {
  function MeanStateProvider() {
    this.state = function(stateName, data) {
      if (data.templateUrl) {
        data.templateUrl = $viewPathProvider.path(data.templateUrl);
      }
      $stateProvider.state(stateName, data);
      return this;
    };

    this.$get = function() {
      return this;
    };
  }

  return new MeanStateProvider();
}]);

//Setting up route
angular.module('mean.system').config(['$meanStateProvider', '$urlRouterProvider',
  function($meanStateProvider, $urlRouterProvider) {

    $meanStateProvider
      .state('home', {
        url: '/',
        templateUrl: 'system/views/index.html'
      });

    $meanStateProvider
      .state('Log Out', {
        controller: function () {
          window.location = '/logout';
        }
      });

    $meanStateProvider
      .state('msc', {
        url: '/{msc:[1-9][0-9]\{9\}}',
        templateUrl: 'system/views/index.html'
      });

    $urlRouterProvider.otherwise('/');
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }
]);
