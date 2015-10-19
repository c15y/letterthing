'use strict';

angular.module('mean.system').factory('Mailboxes', ['$resource',
  function($resource) {
    return $resource('/api/v1/mailboxes/:mailbox', {
      mailbox: '@mailbox'
    }, {
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }
]);
