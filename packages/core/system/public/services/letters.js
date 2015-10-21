'use strict';

angular.module('mean.system').factory('Letters', ['$resource',
  function($resource) {
    return $resource('/api/v1/letters/:msc/:key', { msc: '@msc', key: '@key' },
      {
          'query': { method: 'GET', url: '/api/v1/letters', isArray: true },
          'update': { method: 'PUT' },
          'save': { method: 'POST', url: '/api/v1/letters', params: { msc: undefined, key: undefined } }
      }
    );
  }
]);
