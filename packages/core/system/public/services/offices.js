'use strict';

angular.module('mean.system').factory('Offices', ['$resource',
  function($resource) {
    return $resource('/api/offices/:name', {
      name: '@name'
    }, {
      create: {
        method: 'POST'
      },
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }
]);
