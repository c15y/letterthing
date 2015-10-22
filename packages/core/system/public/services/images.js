'use strict';

angular.module('mean.system').factory('Images', ['$resource',
  function($resource) {
    return $resource('/images/:key', { key: '@key' },
      {
        'get': { method: 'GET', isArray: false }
      }
    );
  }
]);
