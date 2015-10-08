'use strict';

angular.module('mean.system').factory('MailStops', ['$resource',
  function($resource) {
    return $resource('/api/mailStops/:code', {
      code: '@code'
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
