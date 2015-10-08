'use strict';

angular.module('mean.system').factory('Offices', ['$resource',
  function($resource) {
    return $resource('/api/offices/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }
]);
