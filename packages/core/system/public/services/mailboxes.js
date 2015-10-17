'use strict';

angular.module('mean.system').factory('Mailboxes', ['$resource',
  function($resource) {
    return $resource('/api/v1/mailboxes/:code', {
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
