'use strict';

angular.module('mean.system').factory('Images', ['$resource',
  function($resource) {
    return $resource('/api/v1/images/:key', { key: '@key' },
      {
        'get': { method: 'GET', isArray: false }
      }
    );
  }
]);
