'use strict';

angular.module('mean.system').factory('Letters', ['$resource',
  function($resource) {
    return $resource('/api/v1/letters', null,
      {
        'query': { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'save': { method: 'POST' }
      }
    );
  }
]);
